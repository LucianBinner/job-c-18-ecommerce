import { UserController } from './entrypoints/controller/user-controller';
import { MapUserRequestToCTOHelper } from './helpers';
import { SaveUserUseCase } from './usecases/save-user-usecase/save-user-usecase';
import { SignInUseCase } from './usecases/signin-usecase/signin-usecase';
import { UpdateUserUseCase } from './usecases/update-user-usecase/update-user-usecase';

export const controllersUser = [UserController];

export const providersUser = [
  SaveUserUseCase,
  SignInUseCase,
  UpdateUserUseCase,
  MapUserRequestToCTOHelper,
];
