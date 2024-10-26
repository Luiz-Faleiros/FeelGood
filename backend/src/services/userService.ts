import User, { IUserModel } from '../models/User';
import Score, { IScore } from '../models/Score';
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

  public async getUserDetails(userId: string): Promise<IUserModel | null> {
    return await User.findById(userId);
  }

  public async getUserScores(userId: string): Promise<IScore[]> {
    return await Score.find({ userId }).sort({ createdAt: -1 });
  }

  public async updatePassword(userId: string, newPassword: string): Promise<IUserModel | null> {
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { hash: newHash },
      { new: true } 
    );

    return updatedUser;
  }
}

export default new UserService();
