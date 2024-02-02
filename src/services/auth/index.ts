import logger from 'logger';
import { UserLoginData, UserSignupData } from 'types';
import UserSchema from 'models/auth/user';
import { HTTP_STATUS } from 'consts';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const authServices = {
  login: () => {
    return 'Login';
  },
  signUp: async (data: UserSignupData) => {
    const { name, email, password } = data;
    try {
      // check if user exists
      const userExists = await UserSchema.findOne({ email }).lean();
      if (userExists) {
        return {
          code: HTTP_STATUS.CONFLICT,
          message: 'User already exists',
        };
      }
      // create user
      const hashedPassword = await bcrypt.hash(
        password,
        process.env.SALT_ROUNDS || 10,
      );
      const user = new UserSchema({ email, password: hashedPassword, name });
      await user.save();

      // create public key and private key
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
      });
      logger.info({
        publicKey,
        privateKey,
      });

      return {
        code: HTTP_STATUS.CREATED,
        message: 'User created',
      };
    } catch (error) {
      logger.error(
        'Error in src/services/auth/index.ts: login function',
        error,
      );
    }
  },
};
