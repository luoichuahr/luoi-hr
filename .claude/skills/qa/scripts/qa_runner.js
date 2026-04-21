#!/usr/bin/env node
/**
 * qa_runner.js — QA/QC script cho Lười HR (Docusaurus)
 * Cross-platform: tự detect Windows / Mac / Linux
 * Chạy: node .claude/skills/qa/scripts/qa_runner.js
 * Từ thư mục root của project (luoi-hr/)
 */

const fs = require("fs");
const path = require("path");
const { execSync, spawnSync } = require("child_process");

// ─── Detect OS ────────────────────────────────────────────────────────────────
const IS_WINDOWS = process.platform === "win32";
const IS_MAC = process.platform === "darwin";
const OS_LABEL = IS_WINDOWS ? "Windows" : IS_MAC ? "macOS" : "Linux";

// npm binary: Windows cần "npm.cmd" trong child_process
const NPM = IS_WINDOWS ? "npm.cmd" : "npm";

// ─── Config ───────────────────────────────────────────────────────────────────
const PROJECT_ROOT = process.cwd();
const REPORT_PATH = path.join(PROJECT_ROOT, "QA_REPORT.md");
const TOTAL_ROUNDS = 3;

// Giới hạn số dòng theo CLAUDE.md
const LINE_LIMITS = {
  "src/components/PromptBlock": 80,
  "src/components/Callout": 60,
  "src/components/LeadForm": 100,
  "docusaurus.config.js": 100,
};
const DEFAULT_COMPONENT_LIMIT = 200;
const BUNDLE_WARN_KB = 300;
const BUNDLE_BLOCK_KB = 500;
const IMAGE_WARN_KB = 500;
const IMAGE_CRITICAL_KB = 2048;

// ─── Utilities ────────────────────────────────────────────────────────────────

function log(msg) {
  process.stdout.write(msg + "\n");
}

function countLines(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return content.split("\n").length;
  } catch {
    return -1;
  }
}

function getFileSizeKB(filePath) {
  try {
    return Math.round(fs.statSync(filePath).size / 1024);
  } catch {
    return -1;
  }
}

// Đệ quy lấy tất cả file trong folder, filter theo extension
function getAllFiles(dir, exts = [], results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && entry !== "node_modules" && entry !== ".git") {
      getAllFiles(fullPath, exts, results);
    } else if (stat.isFile()) {
      if (exts.length === 0 || exts.some((e) => entry.endsWith(e))) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

// Chạy lệnh shell, trả về { success, output, error }
function runCmd(cmd, args = [], opts = {}) {
  const result = spawnSync(cmd, args, {
    cwd: PROJECT_ROOT,
    encoding: "utf8",
    timeout: 120_000, // 2 phút timeout
    ...opts,
  });
  return {
    success: result.status === 0,
    output: (result.stdout || "") + (result.stderr || ""),
    status: result.status,
  };
}

// ─── Checks ───────────────────────────────────────────────────────────────────

/**
 * A. Build & Deploy — CRITICAL
 * Trả về { pass: bool, issues: string[] }
 */
function checkBuild() {
  log("  → Chạy npm run build...");
  const result = runCmd(NPM, ["run", "build"]);

  const issues = [];
  if (!result.success) {
    // Tìm thông tin lỗi cụ thể
    const errorLines = result.output
      .split("\n")
      .filter(
        (l) =>
          l.includes("error") ||
          l.includes("Error") ||
          l.includes("Cannot find") ||
          l.includes("failed")
      )
      .slice(0, 10); // lấy tối đa 10 dòng lỗi
    issues.push("BUILD FAILED — exit code " + result.status);
    errorLines.forEach((l) => issues.push("  " + l.trim()));
  }

  // Kiểm tra bundle size nếu build thành công
  const buildDir = path.join(PROJECT_ROOT, "build");
  if (result.success && fs.existsSync(buildDir)) {
    const jsFiles = getAllFiles(path.join(buildDir, "assets"), [".js"]);
    jsFiles.forEach((f) => {
      const kb = getFileSizeKB(f);
      const rel = path.relative(PROJECT_ROOT, f);
      if (kb > BUNDLE_BLOCK_KB) {
        issues.push(`⚠️ Bundle lớn: ${rel} = ${kb}KB (> ${BUNDLE_BLOCK_KB}KB)`);
      } else if (kb > BUNDLE_WARN_KB) {
        issues.push(`ℹ️ Bundle khá lớn: ${rel} = ${kb}KB (> ${BUNDLE_WARN_KB}KB)`);
      }
    });
  }

  return { pass: result.success, issues };
}

/**
 * B. Components UI — WARN
 */
function checkComponents() {
  const issues = [];

  // Kiểm tra từng component folder
  const srcComponents = path.join(PROJECT_ROOT, "src", "components");
  if (!fs.existsSync(srcComponents)) {
    issues.push("ℹ️ src/components/ chưa tồn tại — bỏ qua component check");
    return { pass: true, issues };
  }

  for (const [relPath, limit] of Object.entries(LINE_LIMITS)) {
    const fullPath = path.join(PROJECT_ROOT, relPath);
    if (!fs.existsSync(fullPath)) continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Đếm tổng dòng của tất cả file trong folder
      const files = getAllFiles(fullPath, [".js", ".jsx", ".ts", ".tsx"]);
      files.forEach((f) => {
        const lines = countLines(f);
        const rel = path.relative(PROJECT_ROOT, f);
        if (lines > limit) {
          issues.push(`⚠️ ${rel}: ${lines} dòng (giới hạn ${limit})`);
        }
      });
    } else {
      const lines = countLines(fullPath);
      if (lines > limit) {
        issues.push(`⚠️ ${relPath}: ${lines} dòng (giới hạn ${limit})`);
      }
    }
  }

  // Kiểm tra component khác không trong LINE_LIMITS
  const compDirs = fs.readdirSync(srcComponents);
  for (const dir of compDirs) {
    const known = Object.keys(LINE_LIMITS).some((k) =>
      k.includes(dir)
    );
    if (!known) {
      const dirPath = path.join(srcComponents, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const files = getAllFiles(dirPath, [".js", ".jsx", ".ts", ".tsx"]);
        files.forEach((f) => {
          const lines = countLines(f);
          if (lines > DEFAULT_COMPONENT_LIMIT) {
            const rel = path.relative(PROJECT_ROOT, f);
            issues.push(`⚠️ ${rel}: ${lines} dòng (vượt giới hạn ${DEFAULT_COMPONENT_LIMIT})`);
          }
        });
      }
    }
  }

  return { pass: issues.length === 0, issues };
}

/**
 * C. Code Quality — WARN
 */
function checkCodeQuality() {
  const issues = [];
  const srcDir = path.join(PROJECT_ROOT, "src");
  const jsFiles = getAllFiles(srcDir, [".js", ".jsx", ".ts", ".tsx"]);

  // Patterns cần tìm
  const patterns = [
    { regex: /console\.log\(/, label: "console.log", severity: "⚠️" },
    { regex: /\/\/\s*TODO/i, label: "TODO comment", severity: "ℹ️" },
    { regex: /\/\/\s*FIXME/i, label: "FIXME comment", severity: "⚠️" },
    { regex: /\/\/\s*HACK/i, label: "HACK comment", severity: "⚠️" },
    { regex: /\bdebugger\b/, label: "debugger statement", severity: "❌" },
    { regex: /\balert\s*\(/, label: "alert()", severity: "⚠️" },
  ];

  for (const file of jsFiles) {
    const content = fs.readFileSync(file, "utf8");
    const lines = content.split("\n");
    const rel = path.relative(PROJECT_ROOT, file);

    lines.forEach((line, i) => {
      for (const { regex, label, severity } of patterns) {
        if (regex.test(line)) {
          issues.push(`${severity} ${rel}:${i + 1} — ${label}`);
        }
      }
    });
  }

  // Kiểm tra case-sensitivity (Windows trap)
  if (IS_WINDOWS) {
    for (const file of jsFiles) {
      const content = fs.readFileSync(file, "utf8");
      const importMatches = content.match(/from ['"]\.\.?\/.+['"]/g) || [];
      importMatches.forEach((imp) => {
        const importPath = imp.replace(/from ['"](.+)['"]/, "$1");
        // Chỉ cảnh báo về case nếu có ký tự hoa trong tên file
        if (/[A-Z]/.test(path.basename(importPath))) {
          const rel = path.relative(PROJECT_ROOT, file);
          issues.push(
            `ℹ️ [Windows trap] ${rel}: import "${importPath}" — verify case trên Linux/Vercel`
          );
        }
      });
    }
  }

  // Kiểm tra setTimeout/setInterval không có cleanup
  for (const file of jsFiles) {
    const content = fs.readFileSync(file, "utf8");
    const rel = path.relative(PROJECT_ROOT, file);
    const hasSetInterval = /setInterval\(/.test(content);
    const hasClearInterval = /clearInterval\(/.test(content);
    const hasSetTimeout = /setTimeout\(/.test(content);
    const hasClearTimeout = /clearTimeout\(/.test(content);

    if (hasSetInterval && !hasClearInterval) {
      issues.push(`⚠️ ${rel}: setInterval không có clearInterval — memory leak risk`);
    }
    if (hasSetTimeout && !hasClearTimeout && content.includes("useEffect")) {
      issues.push(`ℹ️ ${rel}: setTimeout trong useEffect — kiểm tra có cleanup không`);
    }
  }

  return { pass: issues.length === 0, issues };
}

/**
 * D. Performance — WARN
 */
function checkPerformance() {
  const issues = [];

  // Kiểm tra ảnh trong static/
  const staticDir = path.join(PROJECT_ROOT, "static");
  if (fs.existsSync(staticDir)) {
    const imgFiles = getAllFiles(staticDir, [
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".bmp",
    ]);
    imgFiles.forEach((f) => {
      const kb = getFileSizeKB(f);
      const rel = path.relative(PROJECT_ROOT, f);
      if (kb > IMAGE_CRITICAL_KB) {
        issues.push(`❌ Ảnh quá nặng: ${rel} = ${kb}KB (> ${IMAGE_CRITICAL_KB}KB)`);
      } else if (kb > IMAGE_WARN_KB) {
        issues.push(`⚠️ Ảnh khá nặng: ${rel} = ${kb}KB (> ${IMAGE_WARN_KB}KB) — nên compress`);
      }
    });
  }

  // Kiểm tra Google Fonts preconnect
  const configPath = path.join(PROJECT_ROOT, "docusaurus.config.js");
  if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, "utf8");
    if (config.includes("fonts.googleapis.com") && !config.includes("preconnect")) {
      issues.push(
        "ℹ️ Google Fonts được dùng nhưng không thấy preconnect — có thể làm chậm load"
      );
    }
  }

  // Kiểm tra build output nếu có
  const buildDir = path.join(PROJECT_ROOT, "build");
  if (fs.existsSync(buildDir)) {
    let totalJsKB = 0;
    const jsFiles = getAllFiles(path.join(buildDir, "assets"), [".js"]);
    jsFiles.forEach((f) => {
      totalJsKB += getFileSizeKB(f);
    });
    if (totalJsKB > 1500) {
      issues.push(`⚠️ Tổng JS bundle: ${totalJsKB}KB (> 1500KB) — cân nhắc code splitting`);
    }
  }

  return { pass: issues.length === 0, issues };
}

// ─── Report Generation ────────────────────────────────────────────────────────

function buildReport(rounds, osLabel, nodeVersion) {
  const now = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  // Tính kết quả tổng hợp qua 3 vòng
  const categories = ["build", "components", "codeQuality", "performance"];
  const labels = {
    build: "A. Build & Deploy",
    components: "B. Components UI",
    codeQuality: "C. Code Quality",
    performance: "D. Performance",
  };

  // Kiểm tra stability (kết quả có nhất quán không)
  let isStable = true;
  for (const cat of categories) {
    const r1 = rounds[0][cat].pass;
    for (let i = 1; i < rounds.length; i++) {
      if (rounds[i][cat].pass !== r1) isStable = false;
    }
  }

  // Verdict
  const buildFailed = rounds.some((r) => !r.build.pass);
  const hasWarnings = categories.some((c) => rounds[0][c].issues.length > 0);

  let verdict;
  if (buildFailed) {
    verdict = "🔴 FIX BUILD FIRST — không push được";
  } else if (hasWarnings) {
    verdict = "🟡 PUSH WITH WARNINGS — ổn nhưng nên xem xét warnings";
  } else {
    verdict = "🟢 SAFE TO PUSH — code sạch";
  }

  // Tổng hợp issues từ round cuối (ổn định nhất)
  const lastRound = rounds[rounds.length - 1];

  let md = `# QA Report — Lười HR\n`;
  md += `**Date:** ${now}\n`;
  md += `**OS:** ${osLabel}\n`;
  md += `**Node:** ${nodeVersion}\n`;
  md += `**Vòng test:** ${rounds.length}/${TOTAL_ROUNDS}\n\n`;
  md += `---\n\n`;
  md += `## Tổng kết\n\n`;
  md += `| Hạng mục | Vòng 1 | Vòng 2 | Vòng 3 | Kết quả |\n`;
  md += `|----------|--------|--------|--------|----------|\n`;

  for (const cat of categories) {
    // Điền đủ 3 cột, ô nào chưa có data thì ghi "—"
    const cells = [0, 1, 2]
      .map((i) => {
        if (!rounds[i]) return "—";
        const issues = rounds[i][cat].issues;
        // Bỏ qua cột "Bỏ qua do build fail"
        if (issues.length === 1 && issues[0].includes("Bỏ qua")) return "—";
        return rounds[i][cat].pass ? "✅" : cat === "build" ? "❌" : "⚠️";
      })
      .join(" | ");
    const final = lastRound[cat].pass ? "PASS" : cat === "build" ? "❌ FAIL" : "⚠️ WARN";
    md += `| ${labels[cat]} | ${cells} | ${final} |\n`;
  }

  md += `\n**Verdict:** ${verdict}\n\n`;
  md += `---\n\n`;

  // Critical issues
  const criticalIssues = lastRound.build.issues.filter((i) => i.includes("FAILED"));
  if (criticalIssues.length > 0) {
    md += `## ❌ Lỗi CRITICAL (phải fix trước khi push)\n\n`;
    criticalIssues.forEach((i) => (md += `- ${i}\n`));
    md += `\n`;
  }

  // Warnings (bỏ qua build error details và "Bỏ qua" placeholder)
  const allWarnings = categories
    .flatMap((c) => lastRound[c].issues)
    .filter((i) => !i.includes("FAILED") && !i.includes("Bỏ qua do build fail"));

  if (allWarnings.length > 0) {
    md += `## ⚠️ Cảnh báo (nên fix)\n\n`;
    allWarnings.forEach((i) => (md += `- ${i}\n`));
    md += `\n`;
  } else {
    md += `## ⚠️ Cảnh báo\n\nKhông có cảnh báo.\n\n`;
  }

  // Cross-platform notes
  if (IS_WINDOWS) {
    md += `## ℹ️ Ghi chú Windows\n\n`;
    md += `- Script chạy trên Windows — một số issue chỉ thấy trên Windows\n`;
    md += `- Vercel deploy trên Linux (case-sensitive filenames!)\n`;
    md += `- Line endings: kiểm tra .gitattributes có cấu hình CRLF/LF chưa\n\n`;
  }

  // Stability
  md += `## Stability\n\n`;
  if (isStable) {
    md += `✅ Stable — kết quả nhất quán qua ${TOTAL_ROUNDS} vòng test.\n`;
  } else {
    md += `⚠️ Flaky — kết quả không nhất quán giữa các vòng. Cần điều tra thêm.\n`;
  }

  return { md, buildFailed, verdict };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  log("");
  log("╔══════════════════════════════════════════╗");
  log("║     Lười HR — QA Runner v1.0             ║");
  log(`║     OS: ${OS_LABEL.padEnd(14)} Node: ${process.version.padEnd(8)}║`);
  log("╚══════════════════════════════════════════╝");
  log("");

  // Kiểm tra project root
  if (!fs.existsSync(path.join(PROJECT_ROOT, "package.json"))) {
    log("❌ Không tìm thấy package.json — hãy chạy script từ thư mục root của project.");
    process.exit(1);
  }
  if (!fs.existsSync(path.join(PROJECT_ROOT, "docusaurus.config.js"))) {
    log("⚠️ Không tìm thấy docusaurus.config.js — có thể không phải Docusaurus project.");
  }

  const rounds = [];

  for (let round = 1; round <= TOTAL_ROUNDS; round++) {
    log(`\n${"─".repeat(50)}`);
    log(`  VÒNG ${round}/${TOTAL_ROUNDS}`);
    log("─".repeat(50));

    log("\n[A] Build & Deploy...");
    const build = checkBuild();
    log(build.pass ? "  ✅ Build OK" : "  ❌ Build FAILED");
    if (!build.pass && round === 1) {
      log("\n⛔ Build thất bại ở vòng 1 — dừng lại.");
      log("   Fix lỗi build trước, rồi chạy QA lại.\n");
      build.issues.slice(0, 5).forEach((e) => log("   " + e));
      // Vẫn tạo report
      rounds.push({ build, components: { pass: false, issues: ["Bỏ qua do build fail"] }, codeQuality: { pass: false, issues: ["Bỏ qua do build fail"] }, performance: { pass: false, issues: ["Bỏ qua do build fail"] } });
      const { md } = buildReport(rounds, OS_LABEL, process.version);
      fs.writeFileSync(REPORT_PATH, md, "utf8");
      log(`\n📄 Report: QA_REPORT.md\n`);
      process.exit(1);
    }

    log("\n[B] Components UI...");
    const components = checkComponents();
    log(components.pass ? "  ✅ OK" : `  ⚠️ ${components.issues.length} warning(s)`);

    log("\n[C] Code Quality...");
    const codeQuality = checkCodeQuality();
    log(codeQuality.pass ? "  ✅ OK" : `  ⚠️ ${codeQuality.issues.length} issue(s)`);

    log("\n[D] Performance...");
    const performance = checkPerformance();
    log(performance.pass ? "  ✅ OK" : `  ⚠️ ${performance.issues.length} warning(s)`);

    rounds.push({ build, components, codeQuality, performance });
  }

  // Tạo report
  const { md, buildFailed, verdict } = buildReport(rounds, OS_LABEL, process.version);
  fs.writeFileSync(REPORT_PATH, md, "utf8");

  log(`\n${"═".repeat(50)}`);
  log(`  KẾT QUẢ SAU ${TOTAL_ROUNDS} VÒNG`);
  log("═".repeat(50));
  log(`\n  ${verdict}`);
  log(`\n  📄 Report đầy đủ: QA_REPORT.md`);
  log("");

  process.exit(buildFailed ? 1 : 0);
}

main().catch((err) => {
  console.error("QA Runner error:", err);
  process.exit(1);
});
