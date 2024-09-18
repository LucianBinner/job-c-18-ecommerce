import { AuthDecorator } from '@/modules/@shared/decorator/auth/auth.decorator';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../usecases/create-user/create-user.usecase';
import { LoginUserUseCase } from '../../usecases/login-user/login-user.usecase';
import { UpdateUserUseCase } from '../../usecases/update-user/update-user.usecase';
import { LoginUserRequest } from '../request/login-user.request';
import { UserRequest } from '../request/user.request';
import { LoginUserResponse } from '../response/login-user.response';

@Controller('/user')
export class UserController {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post('/login')
  @ApiOkResponse({ type: LoginUserResponse, description: 'Login User' })
  async login(
    @Body()
    input: LoginUserRequest,
  ): Promise<LoginUserResponse> {
    return await this.loginUserUseCase.handle(input);
  }

  @Post('/')
  @ApiBearerAuth()
  @AuthDecorator(['CreateUser', 'UserAdmin'])
  async create(
    @Body()
    input: UserRequest,
  ) {
    await this.createUserUseCase.handle(input);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @AuthDecorator(['UpdateUser', 'UserAdmin'])
  async update(
    @Body()
    input: UserRequest,
    @Param('id')
    id: string,
  ) {
    await this.updateUserUseCase.handle({ user: input, id: Number(id) });
  }
}
