import path from 'path';

export const DEFAULT_ENV = 'qa';
export const ALLOWED_ENVS = new Set(['dev', 'qa', 'staging', 'prod']);

function isValidEnv(env: string): boolean {
  return ALLOWED_ENVS.has(env);
}

export function getEnvFilePath(): string {
  if (process.env.NODE_ENV && !isValidEnv(process.env.NODE_ENV)) throw new Error(`Invalid NODE_ENV: ${process.env.NODE_ENV}. Allowed values are: ${Array.from(ALLOWED_ENVS).join(', ')}`);
  return path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV ?? DEFAULT_ENV}`);
}
