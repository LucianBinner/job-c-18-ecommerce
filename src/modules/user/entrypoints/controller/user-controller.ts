import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { SaveUserUseCase } from '../../usecases/save-user-usecase/save-user-usecase';
import { SignInUseCase } from '../../usecases/signin-usecase/signin-usecase';
import { SignInRequest } from '../request/signin-request';
import { UserRequest } from '../request/user-request';
import { SignInResponse } from '../response/signin-request';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Auth } from '@/modules/@shared/decorator/auth/auth-decorator';
import { UpdateUserUseCase } from '../../usecases/update-user-usecase/update-user-usecase';

@Controller('/user')
export class UserController {
  constructor(
    private readonly saveUserUseCase: SaveUserUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post('/signin')
  @ApiOkResponse({ type: SignInResponse, description: 'Sign In User' })
  async signIn(
    @Body()
    input: SignInRequest,
  ): Promise<SignInResponse> {
    return await this.signInUseCase.handle(input);
  }

  @Post('/signup')
  @ApiBearerAuth()
  @Auth(['CreateUser', 'UserAdmin'])
  async signUp(
    @Body()
    input: UserRequest,
  ) {
    await this.saveUserUseCase.handle(input);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @Auth(['UpdateUser', 'UserAdmin'])
  async update(
    @Body()
    input: UserRequest,
    @Param('id')
    id: string,
  ) {
    await this.updateUserUseCase.handle({ user: input, id: Number(id) });
  }
}
