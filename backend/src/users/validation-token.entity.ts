import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UserActions } from './user-actions.entity';

@Entity('validation_tokens')
export class ValidationToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  token: string;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => UserActions, (UserActions) => UserActions.validation_token)
  @JoinColumn()
  user_actions: UserActions;
}
