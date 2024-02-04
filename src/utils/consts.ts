export const DEVELOPMENT = process.env.NODE_ENV === 'development';

// https code status
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};
// type of HTTP_STATUS
export type HTTP_STATUS_TYPE = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string) || 10;
