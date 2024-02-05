export const DEVELOPMENT = process.env.NODE_ENV === 'development';

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string) || 10;
