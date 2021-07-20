import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UserActions } from './user-actions.entity';

@Entity('auth_tokens')
export class AuthToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  token: string;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => UserActions, (UserActions) => UserActions.auth_token)
  @JoinColumn()
  user_actions: UserActions;
}
