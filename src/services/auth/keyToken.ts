import { InternalServerError } from 'core/errors';
import crypto from 'crypto';
import logger from 'logger';
import TokenModel from 'models/auth/token';
import { User } from 'utils/types';

interface CreateKeyToken {
    userId: User['id'];
    publicKey: string;
    privateKey: string;
}

export const createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
}: CreateKeyToken): Promise<Record<string, string> | null> => {
    try {
        const token = await TokenModel.create({
            user: userId,
            publicKey,
            privateKey,
        });
        return token
            ? {
                  publicKey,
                  privateKey,
              }
            : null;
    } catch (error) {
        logger.error(
            'Error in src/services/auth/keyToken.ts: createKeyToken function',
            error,
        );
        throw new InternalServerError('Error while creating token keys');
    }
};
