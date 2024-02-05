import { STATUS_CODE_TYPE } from 'errors/statusCode';

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

// result of request
export interface RequestResult {
    code: STATUS_CODE_TYPE;
    message: string;
    metadata?: any;
}

// User
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}
