import { execFileSync } from 'node:child_process';

const env = { ...process.env };
delete env.GITHUB_TOKEN;
env.ANTHROPIC_API_KEY = 'test-key-not-used';
env.ANTHROPIC_MODEL = 'claude-sonnet-4-5-20250929';

const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';

try {
  execFileSync(npxCmd, ['tsx', './src/main.ts', 'octocat', 'Hello-World', '1'], {
    env,
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 15000,
  });
  console.log(JSON.stringify({ status: 0 }, null, 2));
} catch (error) {
  const err = error as { status?: number; signal?: string; code?: string; stderr?: Buffer | string; stdout?: Buffer | string };
  console.log(JSON.stringify({
    status: err.status ?? null,
    signal: err.signal ?? null,
    code: err.code ?? null,
    stderr: err.stderr?.toString?.() ?? String(err.stderr ?? ''),
    stdout: err.stdout?.toString?.() ?? String(err.stdout ?? '')
  }, null, 2));
}
