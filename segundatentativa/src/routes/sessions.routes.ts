import { Router, Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import AppError from '../errors/AppError';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {  
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService(); 

        const { user, token } = await authenticateUser.execute({
            email,   
            password
        });

        // Remove password from the user object before sending it in the response
        const { password: _, ...userWithoutPassword } = user;

         response.json({ user: userWithoutPassword, token });
        

    }
); 

export default sessionsRouter;