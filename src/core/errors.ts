import { STATUS_CODE, STATUS_CODE_TYPE } from './statusCode';
import { STATUS_REASON } from './statusReason';

class ResponseError extends Error {
    constructor(
        message: string,
        public statusCode: STATUS_CODE_TYPE,
    ) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class InternalServerError extends ResponseError {
    constructor(
        message: string = STATUS_REASON.INTERNAL_SERVER_ERROR,
        statusCode: STATUS_CODE_TYPE = STATUS_CODE.INTERNAL_SERVER_ERROR,
    ) {
        super(message, statusCode);
    }
}

export class BadRequestError extends ResponseError {
    constructor(
        message: string = STATUS_REASON.BAD_REQUEST,
        statusCode: STATUS_CODE_TYPE = STATUS_CODE.BAD_REQUEST,
    ) {
        super(message, statusCode);
    }
}

export class UnauthorizedError extends ResponseError {
    constructor(
        message: string = STATUS_REASON.UNAUTHORIZED,
        statusCode: STATUS_CODE_TYPE = STATUS_CODE.UNAUTHORIZED,
    ) {
        super(message, statusCode);
    }
}

export class ForbiddenError extends ResponseError {
    constructor(
        message: string = STATUS_REASON.FORBIDDEN,
        statusCode: STATUS_CODE_TYPE = STATUS_CODE.FORBIDDEN,
    ) {
        super(message, statusCode);
    }
}

export class NotFoundError extends ResponseError {
    constructor(
        message: string = STATUS_REASON.NOT_FOUND,
        statusCode: STATUS_CODE_TYPE = STATUS_CODE.NOT_FOUND,
    ) {
        super(message, statusCode);
    }
}

export class ConflictError extends ResponseError {
    constructor(
        message: string = STATUS_REASON.CONFLICT,
        statusCode: STATUS_CODE_TYPE = STATUS_CODE.CONFLICT,
    ) {
        super(message, statusCode);
    }
}
