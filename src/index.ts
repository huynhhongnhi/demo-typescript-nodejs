import express, { Application } from "express";
import apiRouter from "./routes/apiRoutes";

import { connect } from './configs/database';

connect();

const app: Application = express();
const port = 6061;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up route
app.use('/', apiRouter);

/** Server */
try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(error);
    console.error(`Error occured: ${error}`);
}