import { STATUS_CODE_TYPE } from 'core/statusCode';

export interface UserLoginData {
    email: string;
    password: string;
    name: string;
}

export interface UserSignupData {
    name: string;
    email: string;
    password: string;
}
export interface UserLoginData {
    email: string;
    password: string;
    refreshToken: string | null;
}
// result of request
export interface RequestResult<T> {
    statusCode: STATUS_CODE_TYPE;
    message: string;
    metadata?: T;
}

// User
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}
