import express, { Express, Application } from "express";
import morgan from "morgan";

const app: Application = express();
const port = 6061;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up route
app.use('/', require('./routes/apiRoutes'));

const router: Express = express();

/** Logging */
router.use(morgan('dev'));

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(error);
    console.error(`Error occured: ${error}`);
    console.error(error);
}