import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const env = { ...process.env };
delete env.GITHUB_TOKEN;
env.ANTHROPIC_API_KEY = 'voc-212389923721938354816146ab4faad6fc621.04464674';
env.ANTHROPIC_MODEL = 'claude-sonnet-4-5-20250929';

const result = { status: null, stderr: '', stdout: '', error: null };

try {
  result.stdout = execFileSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['tsx', './src/main.ts', 'octocat', 'Hello-World', '1'], {
    cwd: process.cwd(),
    env,
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 15000,
  });
  result.status = 0;
} catch (error) {
  const err = error;
  result.status = err && err.status !== undefined ? err.status : null;
  result.stderr = typeof err?.stderr === 'string' ? err.stderr : (err && err.stderr && typeof err.stderr.toString === 'function' ? err.stderr.toString() : '');
  result.stdout = typeof err?.stdout === 'string' ? err.stdout : (err && err.stdout && typeof err.stdout.toString === 'function' ? err.stdout.toString() : '');
  result.error = { name: err && err.name, message: err && err.message, code: err && err.code, signal: err && err.signal };
}

fs.writeFileSync('debug-cli-check.json', JSON.stringify(result, null, 2), 'utf-8');
console.log('WROTE debug-cli-check.json');
