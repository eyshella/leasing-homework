import { User } from './user';

export interface AuthInfo {
  user: User,
  token: string,
  expirationDate: string
}