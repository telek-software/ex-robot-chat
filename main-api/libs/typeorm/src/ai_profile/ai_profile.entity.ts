import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ai_profile')
export class AIProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  context: string;

  @Column()
  name: string;

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
