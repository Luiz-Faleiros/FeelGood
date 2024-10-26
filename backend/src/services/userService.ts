import User, { IUserModel } from '../models/User';
import bcrypt from 'bcrypt';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  cep: string;
  bairro: string;
}

class UserService {
  public async createUser(data: ICreateUser): Promise<IUserModel> {
    const { name, email, password, age, gender, cep, bairro } = data;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, hash, age, gender, cep, bairro });
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