import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Organization } from '~[typeorm]/organization/organization.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 120 })
  email: string;

  @Column({ length: 120 })
  firstname: string;

  @Column({ length: 120 })
  lastname: string;

  @Column({ unique: true, length: 120 })
  username: string;

  @Column()
  password: string;

  @Column({ enum: ['admin', 'operator', 'consumer'] })
  role: string;

  @Column({ length: 60 })
  displayName: string;

  @Column()
  isAnonymous: boolean;

  @ManyToOne(() => Organization, (organization) => organization.users)
  organization: Organization;

  @Column({ name: 'is-deleted', type: 'boolean', default: false })
  public isDeleted: boolean;

  @CreateDateColumn({
    name: 'created-at',
    type: 'timestamp',
    default: new Date(),
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated-at',
    type: 'timestamp',
    default: new Date(),
  })
  public updatedAt!: Date;
}
