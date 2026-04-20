#!/usr/bin/env node
/**
 * QA Check — tự động chạy sau mỗi lần Claude Write/Edit file
 *
 * Kiểm tra:
 *   1. Giới hạn dòng: component không vượt 200 dòng (rule CLAUDE.md)
 *   2. Syntax JSX: dùng acorn / babel-eslint nếu có, fallback bracket check
 *   3. CHANGELOG: nhắc nếu sửa component mà chưa cập nhật hôm nay
 *   4. Build test: chạy nền (non-blocking), báo lỗi nếu thất bại
 *
 * Input: JSON từ stdin (PostToolUse hook payload của Claude Code)
 * Output: stdout — Claude đọc kết quả và tự sửa nếu có lỗi
 */

const fs   = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

// ─── Giới hạn dòng theo CLAUDE.md ────────────────────────────────────────────
const LINE_LIMITS = {
  'PromptBlock' : 80,
  'Callout'     : 60,
  'LeadForm'    : 100,
  '__default__' : 200,   // mọi component khác
};

// ─── Đọc stdin (hook payload) ─────────────────────────────────────────────────
let raw = '';
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => { main(raw); });

function main(raw) {
  let changedFile = null;
  try {
    const payload = JSON.parse(raw);
    // PostToolUse payload: { tool_name, tool_input: { file_path | path } }
    changedFile = payload?.tool_input?.file_path
               || payload?.tool_input?.path
               || null;
  } catch (_) { /* stdin trống hoặc không phải JSON — chạy full check */ }

  const issues = [];   // lỗi nghiêm trọng → exit 1 → Claude sẽ tự sửa
  const warns  = [];   // cảnh báo nhẹ → chỉ thông báo

  // ── Check 1: Giới hạn dòng ──────────────────────────────────────────────────
  const componentDir = path.join(ROOT, 'src', 'components');
  const filesToCheck = changedFile
    ? [changedFile]
    : getAllComponents(componentDir);

  for (const f of filesToCheck) {
    checkLineLimit(f, issues, warns);
  }

  // ── Check 2: Syntax JSX ─────────────────────────────────────────────────────
  for (const f of filesToCheck) {
    if (f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.tsx')) {
      checkSyntax(f, issues);
    }
  }

  // ── Check 3: CHANGELOG ──────────────────────────────────────────────────────
  if (changedFile && isComponentFile(changedFile)) {
    checkChangelog(warns);
  }

  // ── Check 4: Build test (async, non-blocking) ───────────────────────────────
  runBuildAsync();

  // ── Output ──────────────────────────────────────────────────────────────────
  const label = changedFile ? path.relative(ROOT, changedFile) : 'tất cả components';
  console.log(`\n🔍 QA Check — ${label}`);

  if (issues.length === 0 && warns.length === 0) {
    console.log('✅ Tất cả kiểm tra đạt.');
  }
  if (warns.length > 0) {
    console.log('\n⚠️  Cảnh báo:');
    warns.forEach(w => console.log(`   ⚠️  ${w}`));
  }
  if (issues.length > 0) {
    console.log('\n❌ Lỗi cần sửa:');
    issues.forEach(i => console.log(`   ❌ ${i}`));
  }

  // Exit 1 → Claude Code hiểu cần tự sửa lỗi
  process.exit(issues.length > 0 ? 1 : 0);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAllComponents(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllComponents(full));
    } else if (/\.(jsx?|tsx?)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function isComponentFile(f) {
  return f.includes(path.join('src', 'components'));
}

function getLimit(filePath) {
  const compName = path.basename(path.dirname(filePath));
  return LINE_LIMITS[compName] ?? LINE_LIMITS['__default__'];
}

function checkLineLimit(filePath, issues, warns) {
  if (!fs.existsSync(filePath)) return;
  if (!isComponentFile(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split('\n').length;
  const limit = getLimit(filePath);
  const rel   = path.relative(ROOT, filePath);

  if (lines > limit) {
    issues.push(`${rel}: ${lines} dòng (giới hạn ${limit}) — cần tách component!`);
  } else if (lines > limit * 0.9) {
    warns.push(`${rel}: ${lines}/${limit} dòng — gần đạt giới hạn.`);
  }
}

function checkSyntax(filePath, issues) {
  if (!fs.existsSync(filePath)) return;
  const rel = path.relative(ROOT, filePath);

  // Thử chạy ESLint nếu có
  try {
    execSync(`npx --no-install eslint "${filePath}" --quiet 2>&1`, {
      cwd: ROOT, stdio: 'pipe', timeout: 10000
    });
    return; // ESLint OK
  } catch (e) {
    const out = e.stdout?.toString() || e.stderr?.toString() || '';
    // Nếu lỗi là "không tìm thấy eslint", bỏ qua
    if (out.includes('not found') || out.includes('No ESLint')) return;
    if (out.trim()) {
      issues.push(`Lint ${rel}:\n${out.trim().split('\n').slice(0,5).join('\n')}`);
      return;
    }
  }

  // Fallback: kiểm tra bracket cơ bản
  try {
    const src = fs.readFileSync(filePath, 'utf8');
    let depth = 0;
    for (const ch of src) {
      if (ch === '{') depth++;
      if (ch === '}') depth--;
      if (depth < 0) {
        issues.push(`Syntax ${rel}: dấu } thừa — kiểm tra lại!`);
        return;
      }
    }
    if (depth !== 0) {
      issues.push(`Syntax ${rel}: thiếu ${depth} dấu } đóng!`);
    }
  } catch (_) {}
}

function checkChangelog(warns) {
  const changelogPath = path.join(ROOT, 'CHANGELOG.md');
  if (!fs.existsSync(changelogPath)) {
    warns.push('CHANGELOG.md không tồn tại — tạo mới theo quy trình CLAUDE.md!');
    return;
  }

  const stat = fs.statSync(changelogPath);
  const today = new Date().toDateString();
  const modified = new Date(stat.mtime).toDateString();

  if (today !== modified) {
    warns.push('CHANGELOG.md chưa cập nhật hôm nay — nhớ ghi quyết định trước khi commit!');
  }
}

function runBuildAsync() {
  // Chạy nền — không block QA output
  const logFile = path.join(ROOT, 'logs', 'build-check.log');
  try { fs.mkdirSync(path.join(ROOT, 'logs'), { recursive: true }); } catch (_) {}

  const child = spawn('npm', ['run', 'build', '--', '--no-minify'], {
    cwd: ROOT,
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let out = '';
  child.stdout.on('data', d => { out += d; });
  child.stderr.on('data', d => { out += d; });

  child.on('close', code => {
    const ts = new Date().toISOString();
    const result = code === 0
      ? `[${ts}] ✅ Build OK\n`
      : `[${ts}] ❌ Build FAIL (exit ${code})\n${out}`;
    fs.writeFileSync(logFile, result);

    if (code !== 0) {
      // Ghi thêm vào stderr để Claude Code thấy nếu đang chờ
      process.stderr.write(`\n⚠️  Build test thất bại — xem chi tiết: logs/build-check.log\n`);
    }
  });

  child.unref(); // không block process cha
  console.log('🏗️  Build test đang chạy nền → kết quả lưu tại logs/build-check.log');
}
