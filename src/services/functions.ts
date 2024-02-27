import { User as UserSchema } from 'models/user.model';
import { User } from 'utils/types';

export async function findUserByEmail(email: string): Promise<User | null> {
    return await UserSchema.findOne({ email }).lean();
}

export function findUserBy(query: Record<string, unknown>) {
    return UserSchema.findOne(query).lean();
}
