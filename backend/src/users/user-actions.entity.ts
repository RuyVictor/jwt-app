import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';
import { AuthToken } from './auth-token.entity';
import { ValidationToken } from './validation-token.entity';

@Entity('users_actions')
export class UserActions {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @OneToOne(() => AuthToken, (AuthToken) => AuthToken.user_actions, {eager: true})
  auth_token: AuthToken;

  @OneToOne(() => ValidationToken, (ValidationToken) => ValidationToken.user_actions, {eager: true})
  validation_token: ValidationToken;

  @OneToOne(() => User, (User) => User.user_actions)
  @JoinColumn()
  user: User;
}
