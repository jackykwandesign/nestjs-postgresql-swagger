import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { UserRole } from './enum/user-role.enum';
import { UserStatus } from './enum/user-status.enum';

@Entity({ name: 'user' })
export class User extends BaseEntity {

  // @Column({ type: 'varchar', length: 100 , default: null})
  // name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({type:"enum", enum:UserRole, array:true, default: [UserRole.NORMAL]})
  roles: UserRole[];

  @Column({type:"enum", enum:UserStatus, default: UserStatus.ACTIVE})
  status: UserStatus;

  @Column({ type: 'varchar', length: 100, default: null })
  mfaSecret: string;

  @Column({ type: 'boolean', default: false })
  isEnableMFA: boolean;
}