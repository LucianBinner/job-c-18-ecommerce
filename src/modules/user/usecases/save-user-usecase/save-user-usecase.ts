import { ConflictDataError } from '@/modules/@shared/errors';
import { SaveUserInput } from './save-user-input';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user/user-repository';
import { CryptographyAdapter } from '@/modules/@shared/adapters';

@Injectable()
export class SaveUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: CryptographyAdapter,
  ) {}
  async handle(input: SaveUserInput): Promise<void> {
    const userResponse = await this.userRepository.getByAccessId(
      input.accessId,
    );
    if (userResponse) throw new ConflictDataError(input.accessId);
    const hash = await this.cryptography.hashGenerator(input.password);
    await this.userRepository.save({ ...input, password: hash });
  }
}
