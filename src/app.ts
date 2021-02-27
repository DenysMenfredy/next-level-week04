import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import bodyParser from 'body-parser';
import './database'
import { router } from './routes';
import createConnection from './database';
import { AppError } from './errors/AppError';

createConnection();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: "Error",
        message: `'Internal Server Erro ${err.message}`
    });
});

export { app };