import dotenv, { config } from 'dotenv';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import Database from './databases/index';
import { appConfig } from './configs/index';
import AppRouter from './routes/index';
import { ROUTES } from 'configs/routes';
import { corsOptions } from 'configs/cors';

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

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to node server');
});

//Routes

app.use(ROUTES.version1, AppRouter);

app.listen(PORT, () => {
    console.log(`Server is Fire at http://localhost:${PORT}`);
});
