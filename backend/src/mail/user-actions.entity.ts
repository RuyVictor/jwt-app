import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/users/user.entity';

@Entity('users_actions')
export class UserActions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  email_confirmation_token: string;

  @Column({ nullable: true })
  forgot_password_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, (User) => User.user_actions)
  @JoinColumn()
  user: User;
}
