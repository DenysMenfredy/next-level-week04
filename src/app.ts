import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import './database'
import { router } from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(router);


export { app };