// Import necessary modules
import 'reflect-metadata'
import express, { Request, Response, NextFunction  } from 'express';
import 'express-async-errors'; // This middleware allows us to handle async errors in routes
import routes  from './routes/index';
import './database'
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import cors from 'cors'

// Create an instance of the Express application
const app = express();

// This line is CRUCIAL - it parses JSON request bodies
app.use(cors({}))
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));

// Define a simple route for the root URL
app.get('/', (request, response) => {
     response.send('Hello, Bruno!')
})

// Use the imported routes
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
         response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    console.error(err);

    response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })

})

// Start the server on port 3333
app.listen(3333, '0.0.0.0', () => {
    console.log('Server is running on http://localhost:3333');
})