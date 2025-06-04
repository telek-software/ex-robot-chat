import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '~[typeorm]/user/user.entity';

@Entity('organization')
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name: string;

  @Column()
  label: string;

  @Column()
  plan: string;

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

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
