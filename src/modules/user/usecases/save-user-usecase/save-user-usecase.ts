import {
  CryptographyInterface,
  UseCaseInterface,
  ValidatorInterface,
} from '@/modules/@shared/protocols';
import { UserRepository } from '../../domain/repositories/user/user-repository';
import { ConflictDataError } from '@/modules/@shared/errors';
import { SaveCto as I } from '../../domain/repositories/user/ctos';

export class SaveUserUseCase implements UseCaseInterface<I, void> {
  constructor(
    private readonly validations: ValidatorInterface,
    private readonly userRepository: UserRepository,
    private readonly cryptography: CryptographyInterface,
  ) {}
  async handle(input: I): Promise<void> {
    this.validations.validate(input);
    const userResponse = await this.userRepository.getByAccessId(
      input.accessId,
    );
    if (userResponse) throw new ConflictDataError(input.accessId);
    const hash = await this.cryptography.hash(input.password);
    await this.userRepository.save({ ...input, password: hash });
  }
}
