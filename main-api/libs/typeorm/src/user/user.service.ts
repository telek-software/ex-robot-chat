import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { encrypt } from '..//typeorm.functions';

import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  create(nextUser: Partial<User>): Promise<User> {
    const user = { ...new User(), ...nextUser };
    user.password = encrypt(user.password);
    return this.repository.save(user);
  }

  findAll() {
    return this.repository.find();
  }

  findOne({ id, email }: { id?: number; email?: string }) {
    if (!id && !email) return null;
    if (email) return this.repository.findOne({ where: { email } });
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, putUser: Partial<User>) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new Error('No User');
    const updatedUser = { ...user, ...putUser };
    updatedUser.id = user.id;
    if (putUser.password) updatedUser.password = encrypt(updatedUser.password);
    return this.repository.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.repository.findOne({ where: { id } });
    user.isDeleted = true;
    return this.repository.save(user);
  }
}
