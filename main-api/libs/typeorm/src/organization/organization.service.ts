import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Organization } from './organization.entity';

@Injectable()
export class OrganizationService {
  @InjectRepository(Organization)
  private readonly repository: Repository<Organization>;

  create(nextOrg: Partial<Organization>): Promise<Organization> {
    const org = { ...new Organization(), ...nextOrg };
    return this.repository.save(org);
  }

  findAll() {
    return this.repository.find();
  }

  findOne({ id }: { id: number }) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, putOrg: Partial<Organization>) {
    const org = await this.repository.findOne({ where: { id } });
    if (!org) throw new Error('No Organization');
    const updatedOrg = { ...org, ...putOrg };
    updatedOrg.id = org.id;
    return this.repository.save(updatedOrg);
  }

  async remove(id: number) {
    const org = await this.repository.findOne({ where: { id } });
    return this.repository.remove(org);
  }
}
