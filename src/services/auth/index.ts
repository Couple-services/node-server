import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { STATUS_CODE } from 'core/statusCode';
import logger from 'logger';
import UserSchema from 'models/auth/user';
import { createTokenPair } from 'utils/auth';
import { SALT_ROUNDS } from 'utils/consts';
import { RequestResult, User, UserSignupData } from 'utils/types';
import { createKeyToken } from './keyToken';
import { ConflictError, InternalServerError } from 'core/errors';

export const signUpService = async (
    data: UserSignupData,
): Promise<
    RequestResult<{
        refreshToken: string;
        accessToken: string;
    }>
> => {
    try {
        const { name, email, password } = data;
        // check if user exists

        const userExists = await UserSchema.findOne({ email }).lean();
        if (userExists) {
            throw new ConflictError('User already exists');
        }
        // create user
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = new UserSchema({ email, password: hashedPassword, name });
        await user.save();

        // create public key and private key
        const publicKey = crypto.randomBytes(64).toString('hex');
        const privateKey = crypto.randomBytes(64).toString('hex');
        const keys = await createKeyToken({
            userId: String(user._id),
            publicKey,
            privateKey,
        });
        if (!keys) {
            throw new InternalServerError('Error while creating token keys');
        }

        const { accessToken, refreshToken } = createTokenPair({
            publicKey,
            privateKey,
            payload: {
                id: String(user._id),
                email,
                name,
            },
        });

        return {
            statusCode: STATUS_CODE.CREATED,
            message: 'User created',
            metadata: {
                accessToken,
                refreshToken,
            },
        };
    } catch (error) {
        logger.error(
            'Error in src/services/auth/index.ts: login function',
            error,
        );
        throw error;
    }
};
