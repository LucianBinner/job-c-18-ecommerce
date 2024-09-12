import { Body, Controller, Post } from '@nestjs/common';
import { SaveUserUseCase } from '../../usecases/save-user-usecase/save-user-usecase';
import { SignUpRequest } from '../request/signup-request';

@Controller('/user')
export class UserController {
  constructor(private readonly saveUserUseCase: SaveUserUseCase) {}

  @Post('/signup')
  async signUp(
    @Body()
    input: SignUpRequest,
  ) {
    await this.saveUserUseCase.handle(input);
  }
}
