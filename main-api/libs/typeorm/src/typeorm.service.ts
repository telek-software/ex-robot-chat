import { Injectable } from '@nestjs/common';

import { AiProfileService } from './ai_profile/ai_profile.service';
import { OrganizationService } from './organization/organization.service';
import { UserService } from './user/user.service';

@Injectable()
export class TypeOrmService {
  constructor(
    public readonly userRepository: UserService,
    public readonly aiProfileRepository: AiProfileService,
    public readonly organizationRepository: OrganizationService,
  ) {}
}
