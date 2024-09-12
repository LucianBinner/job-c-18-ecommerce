import { Body, Controller, Post } from '@nestjs/common';
import { SaveUserUseCase } from '../../usecases/save-user-usecase/save-user-usecase';
import { SignInUseCase } from '../../usecases/signin-usecase/signin-usecase';
import { SignInRequest } from '../request/signin-request';
import { SignUpRequest } from '../request/signup-request';
import { SignInResponse } from '../response/signin-request';

@Controller('/user')
export class UserController {
  constructor(
    private readonly saveUserUseCase: SaveUserUseCase,
    private readonly signInUseCase: SignInUseCase,
  ) {}

  @Post('/signup')
  async signUp(
    @Body()
    input: SignUpRequest,
  ) {
    await this.saveUserUseCase.handle(input);
  }

  @Post('/signin')
  async signIn(
    @Body()
    input: SignInRequest,
  ): Promise<SignInResponse> {
    return await this.signInUseCase.handle(input);
  }
}
