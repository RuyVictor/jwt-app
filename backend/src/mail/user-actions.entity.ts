import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
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
  validation_token: string;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, (User) => User.user_actions)
  @JoinColumn()
  user: User;
}
