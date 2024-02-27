export const DEVELOPMENT = process.env.NODE_ENV === 'development';

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string) || 10;

export const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || '';

export const JWT_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRE || '1h';
