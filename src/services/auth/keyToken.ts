import crypto from 'crypto';
import logger from 'logger';
import TokenModel from 'models/auth/token';
import { User } from 'utils/types';

interface CreateKeyToken {
    userId: User['id'];
    publicKey: crypto.KeyObject;
}

export const createKeyToken = async ({
    userId,
    publicKey,
}: CreateKeyToken): Promise<string | null> => {
    try {
        const publicKeyString = String(
            publicKey.export({ type: 'spki', format: 'pem' }),
        );
        const token = await TokenModel.create({
            user: userId,
            publicKey: publicKeyString,
        });
        return token ? publicKeyString : null;
    } catch (error) {
        logger.error(
            'Error in src/services/auth/keyToken.ts: createKeyToken function',
            error,
        );
        throw error;
    }
};
