import jwt from 'jsonwebtoken';
import logger from 'logger';
import { User } from './types';

// createKeyToken

interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

interface CreateTokenPairDependencies {
    publicKey: string;
    privateKey: string;
    payload: Pick<User, 'id' | 'email' | 'name'>;
}
export const createTokenPair = ({
    publicKey,
    privateKey,
    payload,
}: CreateTokenPairDependencies): TokenPair => {
    const accessToken = jwt.sign(payload, publicKey, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    const refreshToken = jwt.sign(payload, privateKey, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });
    // verify token
    jwt.verify(accessToken, publicKey, (err, decoded) => {
        if (err) {
            logger.error('Error while verifying access token', err);
            throw new Error('Error while verifying access token');
        } else {
            logger.info('Access token is verified', decoded);
        }
    });
    return { accessToken, refreshToken };
};
