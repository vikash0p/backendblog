import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import MongodbConnection from './utils/MongodbConnection.js';
import UserRoute from './MVC/routes/UserRoute.js';
import blogRoute from './MVC/routes/BlogRoute.js'

dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5500;

// Connect to MongoDB
MongodbConnection()
    .then(() => {
        // MongoDB connection successful, set up middleware and routes
        app.use(cors({
            origin: '*',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],

        }));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(morgan('dev'));
        app.use(cookieParser());
        app.use('/auth', UserRoute);
        app.use('/blog', blogRoute);

        // Root route
        app.get('/', (req, res) => {``
            res.send('Hello World!');
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
