import { Response } from 'express';
import { STATUS_CODE, STATUS_CODE_TYPE } from './statusCode';
import { STATUS_REASON, STATUS_REASON_TYPE } from './statusReason';

class SuccessResponse {
    constructor(
        public statusCode: STATUS_CODE_TYPE,
        public message: STATUS_REASON_TYPE,
        public metaData: any,
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.metaData = metaData;
    }
    send(res: Response) {
        return res.status(this.statusCode).json(this);
    }
}

export class CreatedResponse extends SuccessResponse {
    constructor(
        statusCode: STATUS_CODE_TYPE = STATUS_CODE.CREATED,
        message: STATUS_REASON_TYPE = STATUS_REASON.CREATED,
        metaData: any,
    ) {
        super(statusCode, message, metaData);
    }
}

export class OkResponse extends SuccessResponse {
    constructor(
        statusCode: STATUS_CODE_TYPE = STATUS_CODE.OK,
        message: STATUS_REASON_TYPE = STATUS_REASON.OK,
        metaData: any,
    ) {
        super(statusCode, message, metaData);
    }
}
