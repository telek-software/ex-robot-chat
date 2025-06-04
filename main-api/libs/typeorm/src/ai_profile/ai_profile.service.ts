import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AIProfile } from './ai_profile.entity';

@Injectable()
export class AiProfileService {
  @InjectRepository(AIProfile)
  private readonly repository: Repository<AIProfile>;

  create(nextProfile: Partial<AIProfile>): Promise<AIProfile> {
    const profile = { ...new AIProfile(), ...nextProfile };
    return this.repository.save(profile);
  }

  findAll() {
    return this.repository.find();
  }

  findOne({ id }: { id: number }) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, putProfile: Partial<AIProfile>) {
    const profile = await this.repository.findOne({ where: { id } });
    if (!profile) throw new Error('No AIProfile');
    const updatedProfile = { ...profile, ...putProfile };
    updatedProfile.id = profile.id;
    return this.repository.save(updatedProfile);
  }

  async remove(id: number) {
    const profile = await this.repository.findOne({ where: { id } });
    return this.repository.remove(profile);
  }
}
