import { UserController } from './entrypoints/controller/user.controller';
import { MapUserRequestToCTOHelper } from './helpers';
import { CreateUserUseCase } from './usecases/create-user/create-user.usecase';
import { LoginUserUseCase } from './usecases/login-user/login-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user/update-user.usecase';

export const controllersUser = [UserController];

export const providersUser = [
  CreateUserUseCase,
  LoginUserUseCase,
  UpdateUserUseCase,
  MapUserRequestToCTOHelper,
];
