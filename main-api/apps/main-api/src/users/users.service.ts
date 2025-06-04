import { Injectable } from '@nestjs/common';

import { TypeOrmService } from '~[typeorm]';

import { CreateUserInput, UpdateUserInput, UserOutput } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly typeormService: TypeOrmService) {}

  create(createUserInput: CreateUserInput): Promise<UserOutput> {
    return this.typeormService.userRepository.create(createUserInput);
  }

  findAll(): Promise<UserOutput[]> {
    return this.typeormService.userRepository.findAll();
  }

  findOne({ id, email }: { id?: number; email?: string }): Promise<UserOutput> {
    return this.typeormService.userRepository.findOne({ id, email });
  }

  async update(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<UserOutput> {
    return this.typeormService.userRepository.update(id, updateUserInput);
  }

  async remove(id: number): Promise<UserOutput> {
    return this.typeormService.userRepository.remove(id);
  }
}
