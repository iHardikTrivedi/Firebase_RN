import { User } from '@/types/user';

export interface AuthRepository {
  login(email: string, password: string): Promise<User>;
  signup(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
}
