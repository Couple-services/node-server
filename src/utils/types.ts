import { HTTP_STATUS_TYPE } from './consts';

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
    code: HTTP_STATUS_TYPE;
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
