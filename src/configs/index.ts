// development setup

import { DEVELOPMENT } from 'consts';

const dev = {
  app: {
    port: parseInt(process.env.PORT || '3001'),
  },
  db: {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/couple-dev',
  },
};

const prod = {
  app: {
    port: parseInt(process.env.PROD_PORT || '3001'),
  },
  db: {
    mongoUri: process.env.PROD_MONGO_URI || 'mongodb://localhost:27017/couple',
  },
};

export const appConfig = DEVELOPMENT ? dev : prod;
