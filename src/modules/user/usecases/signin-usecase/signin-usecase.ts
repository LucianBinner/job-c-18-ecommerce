import { CryptographyAdapter } from '@/modules/@shared/adapters';
import { InvalidParamError, UnauthorizedError } from '@/modules/@shared/errors';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user/user-repository';
import { SignInInput } from './signin-input';
import { SignInOutput } from './signin-output';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: CryptographyAdapter,
  ) {}
  async handle(input: SignInInput): Promise<SignInOutput> {
    const { accessId, password } = input;
    const userResponse = await this.userRepository.getByAccessId(accessId);
    if (!userResponse) throw new InvalidParamError('accessId');
    const { id } = userResponse;
    const isValid = await this.cryptography.hashComparer(
      password,
      userResponse.password,
    );
    if (!isValid) throw new UnauthorizedError();
    return {
      token: await this.cryptography.tokenGenerator({ id }),
    };
  }
}
