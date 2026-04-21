#!/usr/bin/env node
/**
 * QA Check v2 — tự động chạy sau mỗi lần Claude Write/Edit file
 * Checks: line limits, syntax, changelog, REACT_APP_, hardcoded paths,
 *         key={idx}, console.log/debugger, CSS standalone, dead components, build test
 */

const fs   = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

const LINE_LIMITS = {
  'PromptBlock' : 80,
  'Callout'     : 60,
  'LeadForm'    : 100,
  '__default__' : 200,
};

let raw = '';
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => { main(raw); });

function main(raw) {
  let changedFile = null;
  try {
    const payload = JSON.parse(raw);
    changedFile = payload?.tool_input?.file_path || payload?.tool_input?.path || null;
  } catch (_) {}

  const issues = [];
  const warns  = [];

  const componentDir = path.join(ROOT, 'src', 'components');
  const filesToCheck = changedFile ? [changedFile] : getAllComponents(componentDir);
  for (const f of filesToCheck) { checkLineLimit(f, issues, warns); }
  for (const f of filesToCheck) {
    if (/\.(jsx?|tsx?)$/.test(f)) checkSyntax(f, issues);
  }

  if (changedFile && isComponentFile(changedFile)) checkChangelog(warns);

  const jsxFiles = changedFile
    ? [changedFile].filter(f => /\.(jsx?|tsx?)$/.test(f))
    : getAllJSFiles(path.join(ROOT, 'src'));

  for (const f of jsxFiles) {
    checkReactAppPrefix(f, issues);
    checkHardcodedPath(f, issues);
    checkKeyIdx(f, warns);
    checkDebugCode(f, warns);
  }

  if (!changedFile) {
    checkCSSStandalone(warns);
    checkDeadComponents(warns);
  }

  runBuildAsync();

  const label = changedFile ? path.relative(ROOT, changedFile) : 'toan bo project';
  console.log('\n=== QA Check: ' + label + ' ===');
  if (issues.length === 0 && warns.length === 0) {
    console.log('OK: Tat ca kiem tra dat.');
  }
  if (warns.length > 0) {
    console.log('\nCaution:');
    warns.forEach(w => console.log('  WARN: ' + w));
  }
  if (issues.length > 0) {
    console.log('\nErrors:');
    issues.forEach(i => console.log('  ERROR: ' + i));
  }
  console.log('\nResult: ' + issues.length + ' errors, ' + warns.length + ' warnings');
  process.exit(issues.length > 0 ? 1 : 0);
}

function getAllComponents(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...getAllComponents(full));
    else if (/\.(jsx?|tsx?)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function getAllJSFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...getAllJSFiles(full));
    else if (/\.(jsx?|tsx?)$/.test(entry.name)) files.push(full);
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
  if (!fs.existsSync(filePath) || !isComponentFile(filePath)) return;
  const lines = fs.readFileSync(filePath, 'utf8').split('\n').length;
  const limit = getLimit(filePath);
  const rel = path.relative(ROOT, filePath);
  if (lines > limit) {
    issues.push(rel + ': ' + lines + ' dong (gioi han ' + limit + ') -- can tach component!');
  } else if (lines > limit * 0.9) {
    warns.push(rel + ': ' + lines + '/' + limit + ' dong -- gan dat gioi han.');
  }
}

function checkSyntax(filePath, issues) {
  if (!fs.existsSync(filePath)) return;
  const rel = path.relative(ROOT, filePath);
  try {
    execSync('npx --no-install eslint "' + filePath + '" --quiet 2>&1', {
      cwd: ROOT, stdio: 'pipe', timeout: 10000
    });
    return;
  } catch (e) {
    const out = (e.stdout || e.stderr || '').toString();
    if (out.includes('not found') || out.includes('No ESLint') || out.includes('npx canceled') || out.includes('missing packages')) {
      // Fallback bracket check
      try {
        const src = fs.readFileSync(filePath, 'utf8');
        let depth = 0;
        for (const ch of src) {
          if (ch === '{') depth++;
          if (ch === '}') depth--;
          if (depth < 0) { issues.push('Syntax ' + rel + ': du } thua!'); return; }
        }
        if (depth !== 0) issues.push('Syntax ' + rel + ': thieu ' + depth + ' du } dong!');
      } catch (_) {}
      return;
    }
    if (out.trim()) {
      issues.push('Lint ' + rel + ':\n' + out.trim().split('\n').slice(0,5).join('\n'));
    }
  }
}

function checkChangelog(warns) {
  const changelogPath = path.join(ROOT, 'CHANGELOG.md');
  if (!fs.existsSync(changelogPath)) { warns.push('CHANGELOG.md khong ton tai!'); return; }
  const stat = fs.statSync(changelogPath);
  if (new Date().toDateString() !== new Date(stat.mtime).toDateString()) {
    warns.push('CHANGELOG.md chua cap nhat hom nay -- ghi truoc khi code!');
  }
}

function checkReactAppPrefix(filePath, issues) {
  if (!fs.existsSync(filePath)) return;
  const src = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(ROOT, filePath);
  const matches = src.match(/process\.env\.REACT_APP_\w+/g);
  if (matches) {
    matches.forEach(m => {
      issues.push(rel + ': "' + m + '" khong hop le trong Docusaurus -- doi sang ' + m.replace('REACT_APP_', 'DOCUSAURUS_'));
    });
  }
}

function checkHardcodedPath(filePath, issues) {
  if (!fs.existsSync(filePath)) return;
  const src = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(ROOT, filePath);
  if (/['"`]\/sessions\//.test(src)) {
    issues.push(rel + ': chua duong dan Linux hardcode (/sessions/...) -- dung @site/ hoac relative path!');
  }
}

function checkKeyIdx(filePath, warns) {
  if (!fs.existsSync(filePath)) return;
  const src = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(ROOT, filePath);
  if (/key=\{idx\}|key=\{index\}/.test(src)) {
    warns.push(rel + ': dung index lam React key (key={idx}) -- nen dung unique field neu co');
  }
}

function checkDebugCode(filePath, warns) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const rel = path.relative(ROOT, filePath);
  lines.forEach((line, i) => {
    const t = line.trim();
    if (!t.startsWith('//') && !t.startsWith('*')) {
      if (/console\.log\(/.test(t)) warns.push(rel + ':' + (i+1) + ': console.log con sot');
      if (/\bdebugger\b/.test(t))  warns.push(rel + ':' + (i+1) + ': debugger statement -- xoa ngay!');
    }
  });
}

function findFiles(dir, pattern) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findFiles(full, pattern));
    else if (pattern.test(entry.name)) results.push(full);
  }
  return results;
}

function checkCSSStandalone(warns) {
  const cssFiles = findFiles(path.join(ROOT, 'src'), /\.module\.css$/);
  for (const f of cssFiles) {
    const lines = fs.readFileSync(f, 'utf8').split('\n').length;
    const rel = path.relative(ROOT, f);
    if (lines < 50) warns.push(rel + ': ' + lines + ' dong CSS (<50) -- CLAUDE.md yeu cau inline style');
  }
}

function checkDeadComponents(warns) {
  const compDir = path.join(ROOT, 'src', 'components');
  if (!fs.existsSync(compDir)) return;
  const nonCompFiles = [
    ...findFiles(path.join(ROOT, 'src', 'pages'), /\.(jsx?|tsx?|mdx?)$/),
    ...findFiles(path.join(ROOT, 'docs'), /\.mdx?$/),
  ];
  const allSource = nonCompFiles.map(f => { try { return fs.readFileSync(f, 'utf8'); } catch { return ''; } }).join('\n');
  const components = fs.readdirSync(compDir, { withFileTypes: true })
    .filter(e => e.isDirectory()).map(e => e.name);
  for (const comp of components) {
    if (!allSource.includes(comp)) {
      warns.push('src/components/' + comp + ': khong thay import o dau -- co the la dead code');
    }
  }
}

function runBuildAsync() {
  const logDir = path.join(ROOT, 'logs');
  const logFile = path.join(logDir, 'build-check.log');
  try { fs.mkdirSync(logDir, { recursive: true }); } catch (_) {}
  const child = spawn('npm', ['run', 'build', '--', '--no-minify'], {
    cwd: ROOT, detached: true, stdio: ['ignore', 'pipe', 'pipe'],
  });
  let out = '';
  child.stdout.on('data', d => { out += d; });
  child.stderr.on('data', d => { out += d; });
  child.on('close', code => {
    const ts = new Date().toISOString();
    fs.writeFileSync(logFile, code === 0
      ? '[' + ts + '] BUILD OK\n'
      : '[' + ts + '] BUILD FAIL (exit ' + code + ')\n' + out
    );
    if (code !== 0) process.stderr.write('\nBuild FAIL -- xem: logs/build-check.log\n');
  });
  child.unref();
  console.log('Build test chay nen -> logs/build-check.log');
}
