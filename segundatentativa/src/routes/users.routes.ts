import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {  
        const { name, email, password } = request.body

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,   
            email,
            password
        });
        
           const { password: _, ...userWithoutPassword } = user; // Remove password from the response for security reasons

         response.json(userWithoutPassword)

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        if (!request.file) {
             response.status(400).json({ error: 'Avatar file is required.' });
             return;
        }
        
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename
        });

const { password, ...userWithoutPassword } = user;
 response.json(userWithoutPassword);

        response.status(200).json(user);
        

  }
)

export default usersRouter;