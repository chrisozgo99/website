#!/usr/bin/env node
/**
 * Guard against build-time config tampering.
 *
 * In August 2026 this repo was force-pushed with a payload appended to
 * postcss.config.js: one enormous line, padded with whitespace so it sat
 * off-screen in an editor, using \u escapes to hide `require('child_process')`
 * and an eval'd second stage. Config files like this one are executed by
 * `next build`, `next dev` and the test runner, so anything hidden in them
 * runs with full access to the build environment and its secrets.
 *
 * These heuristics are deliberately blunt: config files are short,
 * hand-written and boring, so anything that looks generated or obfuscated in
 * one is worth failing the build over.
 */
const fs = require('fs');
const path = require('path');

const TARGETS = [
  'postcss.config.js',
  'next.config.js',
  'tailwind.config.js',
  'babel.config.js',
  'jest.config.js',
  'jest.setup.ts',
  'commitlint.config.js',
  'lint-staged.config.js',
  'next-sitemap.config.js',
  'cypress.config.js',
  '.storybook/main.ts',
  '.storybook/preview.ts',
];

const MAX_LINE_LENGTH = 300;
const MAX_UNICODE_ESCAPES = 8;

const CHECKS = [
  {
    name: 'suspiciously long line (payloads hide past the right edge)',
    test: (line) => line.length > MAX_LINE_LENGTH,
  },
  {
    name: 'dense \\u escape sequences (string obfuscation)',
    test: (line) =>
      (line.match(/\\u00[0-9a-fA-F]{2}/g) || []).length > MAX_UNICODE_ESCAPES,
  },
  {
    name: 'dynamic code execution',
    test: (line) => /\beval\s*\(|new\s+Function\s*\(/.test(line),
  },
  {
    name: 'process spawning',
    test: (line) => /child_process|\bspawn\s*\(|\bexecSync\s*\(/.test(line),
  },
  {
    name: 'network client in a config file',
    test: (line) =>
      /require\(\s*['"](https?|net|dgram|tls)['"]\s*\)/.test(line),
  },
];

const findings = TARGETS.filter((target) =>
  fs.existsSync(path.join(process.cwd(), target))
).flatMap((target) => {
  const lines = fs
    .readFileSync(path.join(process.cwd(), target), 'utf8')
    .split('\n');

  return lines.flatMap((line, index) =>
    CHECKS.filter((check) => check.test(line)).map((check) => ({
      file: target,
      line: index + 1,
      reason: check.name,
      preview: line.trim().slice(0, 120),
    }))
  );
});

if (findings.length === 0) {
  process.stdout.write(
    'config integrity: all build-time config files look clean\n'
  );
  process.exit(0);
}

process.stderr.write('\nCONFIG INTEGRITY CHECK FAILED\n\n');
findings.forEach((finding) => {
  process.stderr.write(
    `  ${finding.file}:${finding.line} - ${finding.reason}\n`
  );
  process.stderr.write(`    ${finding.preview}...\n\n`);
});
process.stderr.write(
  'A build-time config file contains something that looks obfuscated or\n' +
    'generated. If you did not write this, do NOT run the build: inspect the\n' +
    'file and check `git log` for commits you do not recognise.\n\n'
);
process.exit(1);
