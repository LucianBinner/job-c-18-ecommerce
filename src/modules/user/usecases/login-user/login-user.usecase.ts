import { CryptographyAdapter } from '@/modules/@shared/adapters';
import { InvalidParamError, UnauthorizedError } from '@/modules/@shared/errors';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../@shared/repositories/user/user.repository';
import { LoginUserInput } from './login-user.input';
import { LoginUserOutput } from './login-user.output';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: CryptographyAdapter,
  ) {}
  async handle(input: LoginUserInput): Promise<LoginUserOutput> {
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
