import { User } from 'utils/types';
import UserSchema from 'models/auth/user';
import crypto from 'crypto';

export async function findUserByEmail(email: string): Promise<User | null> {
    return await UserSchema.findOne({ email }).lean();
}

export function findUserBy(query: Record<string, unknown>) {
    return UserSchema.findOne(query).lean();
}

export function createKeysPair() {
    const publicKey = crypto.randomBytes(64).toString('hex');
    const privateKey = crypto.randomBytes(64).toString('hex');
    return { publicKey, privateKey };
}
