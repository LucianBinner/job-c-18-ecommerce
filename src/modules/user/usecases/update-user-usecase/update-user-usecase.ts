import { CryptographyAdapter } from '@/modules/@shared/adapters';
import { ConflictDataError } from '@/modules/@shared/errors';
import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '../../../@shared/repositories/user-role/user-role-repository';
import { UserRepository } from '../../../@shared/repositories/user/user-repository';
import { UpdateUserInput } from './update-user-input';
import { MapUserRequestToCTOHelper } from '../../helpers';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: CryptographyAdapter,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly mapUserRequestToCTOHelper: MapUserRequestToCTOHelper,
  ) {}
  async handle(input: UpdateUserInput): Promise<void> {
    const { id, user } = input;
    const userResponse = await this.userRepository.getByAccessIdAndNotId({
      id,
      accessId: user.accessId,
    });
    if (userResponse) throw new ConflictDataError(user.accessId);
    const hash = await this.cryptography.hashGenerator(user.password);
    const updateUserCTO = this.mapUserRequestToCTOHelper.map(user);
    const userData = await this.userRepository.updateById({
      user: {
        ...updateUserCTO,
        password: hash,
      },
      id,
    });
    await this.userRoleRepository.deleteManyByUserId(id);
    await this.userRoleRepository.saveMany({
      user: userData,
      roles: user.roles,
    });
  }
}
