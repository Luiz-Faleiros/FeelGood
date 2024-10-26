import User, { IUserModel } from '../models/User';
import { IUser } from '../interfaces/IUser';
import bcrypt from 'bcrypt';

class UserService {
    public async createUser(userData: IUser): Promise<IUserModel> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userData.password, salt);
        const user = new User({ 
            name: userData.name, 
            email: userData.email, 
            password: userData.password,
            hash 
        });
        return await user.save();
    }

    public async authenticate(email: string, password: string): Promise<IUserModel | null> {
        const user = await User.findOne({ email });
        if (!user) return null;
        const isMatch = await bcrypt.compare(password, user.hash);
        if (!isMatch) return null;
        return user;
    }
}

export default new UserService();
