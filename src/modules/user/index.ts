import { UserController } from './entrypoints/controller/user-controller';
import { MapUserCTORule } from './usecases/save-user-usecase/rules';
import { SaveUserUseCase } from './usecases/save-user-usecase/save-user-usecase';
import { SignInUseCase } from './usecases/signin-usecase/signin-usecase';

export const controllersUser = [UserController];

export const providersUser = [SaveUserUseCase, SignInUseCase, MapUserCTORule];
