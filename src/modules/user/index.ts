import { UserController } from './entrypoints/controller/user-controller';
import { UserRoleRepository } from './repositories/user-role/user-role-repository';
import { UserRepository } from './repositories/user/user-repository';
import { MapUserCTORule } from './usecases/save-user-usecase/rules';
import { SaveUserUseCase } from './usecases/save-user-usecase/save-user-usecase';
import { SignInUseCase } from './usecases/signin-usecase/signin-usecase';

export const controllersUser = [UserController];

export const providersUser = [
  SaveUserUseCase,
  SignInUseCase,
  UserRepository,
  UserRoleRepository,
  MapUserCTORule,
];
