import { CryptographyAdapter } from '@/modules/@shared/adapters';
import { ConflictDataError } from '@/modules/@shared/errors';
import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '../../../@shared/repositories/user-role/user-role-repository';
import { UserRepository } from '../../../@shared/repositories/user/user-repository';
import { MapUserCTORule } from './rules';
import { SaveUserInput } from './save-user-input';

@Injectable()
export class SaveUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: CryptographyAdapter,
    private readonly roleRepository: UserRoleRepository,
    private readonly mapUserCTO: MapUserCTORule,
  ) {}
  async handle(input: SaveUserInput): Promise<void> {
    const userResponse = await this.userRepository.getByAccessId(
      input.accessId,
    );
    if (userResponse) throw new ConflictDataError(input.accessId);
    const hash = await this.cryptography.hashGenerator(input.password);
    const saveUserCTO = this.mapUserCTO.map(input);
    const userData = await this.userRepository.save({
      ...saveUserCTO,
      password: hash,
    });
    await this.roleRepository.saveMany({ user: userData, roles: input.roles });
  }
}
