import { getRepository } from 'typeorm';
import path from 'path';
import User from '../models/User';
import uploadConfig from '../config/upload';
import fs from 'fs';
import AppError from "../errors/AppError";

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
 public async execute({ user_id, avatarFilename}: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
        throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
        // If the user already has an avatar, we can delete the old one
        // Note: You might want to implement file deletion logic here if you're storing files on disk
        const userAvatarPath = path.join(uploadConfig.directory, user.avatar);
        const userAvatarFileExists = await fs.promises.stat(userAvatarPath);
    
        if(userAvatarFileExists) {
            await fs.promises.unlink(userAvatarPath);
        }
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);

    return user;
    }
}

export default UpdateUserAvatarService;