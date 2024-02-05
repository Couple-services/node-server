import { appConfig } from 'configs/index';
import { DEVELOPMENT } from 'utils/consts';
import logger from 'logger';
import mongoose from 'mongoose';

// singleton pattern

export enum DatabaseType {
    MONGO = 'mongo',
    POSTGRES = 'postgres',
    MYSQL = 'mysql',
}

class Database {
    private static instance: Database;

    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        Database.instance = this;
    }

    public async connect(type: DatabaseType = DatabaseType.MONGO) {
        if (type === DatabaseType.MONGO) {
            try {
                if (DEVELOPMENT) {
                    mongoose.set('debug', true);
                    mongoose.set('debug', {
                        color: true,
                    });
                }
                await mongoose.connect(appConfig.db.mongoUri);
                logger.info('MongoDB connected');
            } catch (error) {
                logger.error('MongoDB connection error', error);
            }
        }
    }
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

export default new Database();
