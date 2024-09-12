import { UserController } from './entrypoints/controller/user-controller';
import { UserRepository } from './repositories/user/user-repository';
import { SaveUserUseCase } from './usecases/save-user-usecase/save-user-usecase';

export const controllersUser = [UserController];

export const providersUser = [SaveUserUseCase, UserRepository];
