/**
 * Postinstall patch: fix lỗi ValidationError ProgressPlugin
 *
 * Root cause: webpackbar (dùng bởi Docusaurus) extends webpack.ProgressPlugin
 * và overwrite this.options với options của nó (name, color, reporters, reporter).
 * Webpack validate this.options trong _applyOnCompiler() → fail vì schema
 * có additionalProperties: false.
 *
 * Fix: comment out validate call trong webpack/lib/ProgressPlugin.js
 */

const fs = require('fs');
const path = require('path');

const TARGET = path.join(
  __dirname, '..', 'node_modules', 'webpack', 'lib', 'ProgressPlugin.js'
);

if (!fs.existsSync(TARGET)) {
  console.log('patch-webpack: ProgressPlugin.js không tìm thấy, bỏ qua.');
  process.exit(0);
}

const original = fs.readFileSync(TARGET, 'utf8');

const MARKER = '// Patched: skip validation';
if (original.includes(MARKER)) {
  console.log('patch-webpack: ✓ Đã được patch từ trước.');
  process.exit(0);
}

// Thử match bằng string cố định trước (chính xác hơn regex)
const PATCH_TARGET = `\t\tcompiler.hooks.validate.tap(PLUGIN_NAME, () => {
\t\t\tcompiler.validate(
\t\t\t\t() => require("../schemas/plugins/ProgressPlugin.json"),
\t\t\t\tthis.options,
\t\t\t\t{
\t\t\t\t\tname: "Progress Plugin",
\t\t\t\t\tbaseDataPath: "options"
\t\t\t\t},
\t\t\t\t(options) => require("../schemas/plugins/ProgressPlugin.check")(options)
\t\t\t);
\t\t});`;
const PATCH_REPLACEMENT = `\t\t// Patched: skip validation để tương thích webpackbar (Docusaurus 3.10 + webpack 5.x)\n\t\t// compiler.hooks.validate.tap(PLUGIN_NAME, () => { ... });`;

let patched = original;
if (original.includes(PATCH_TARGET)) {
  patched = original.replace(PATCH_TARGET, PATCH_REPLACEMENT);
} else {
  // Fallback: regex
  patched = original.replace(
    /compiler\.hooks\.validate\.tap\(PLUGIN_NAME,\s*\(\)\s*=>\s*\{[\s\S]*?compiler\.validate\([\s\S]*?\}\s*\}\);/,
    PATCH_REPLACEMENT
  );
}

if (patched === original) {
  console.log('patch-webpack: ⚠ Regex không match — kiểm tra lại ProgressPlugin.js');
} else {
  fs.writeFileSync(TARGET, patched);
  console.log('patch-webpack: ✓ Đã patch webpack/lib/ProgressPlugin.js thành công.');
}
