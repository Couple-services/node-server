import dotenv, { config } from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import Database from './databases/index';
import { appConfig } from './configs/index';
import AppRouter from './routes/index';
import { ROUTES } from 'configs/routes';
import { corsOptions } from 'configs/cors';
import { STATUS_CODE } from 'core/statusCode';
import logger from 'logger';
import { NotFoundError } from 'core/errors';

//For env File
dotenv.config();

const PORT = appConfig.app.port;

const app: Application = express();
// Use Helmet!
app.use(helmet());
// Use Compression!
app.use(compression());
// Use Morgan!
app.use(morgan('dev'));

// Use Cors!
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
Database.connect();

app.get(`${ROUTES.version1}`, (req: Request, res: Response) => {
    res.send('Welcome to couple api');
});

//Routes
app.use(ROUTES.version1, AppRouter);

// Error handler

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Something went wrong';
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
});

app.listen(PORT, () => {
    logger.info(`Server is Fire at http://localhost:${PORT}${ROUTES.version1}`);
});
