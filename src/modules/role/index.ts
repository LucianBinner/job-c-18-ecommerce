import { RoleController } from './entrypoints/controllers/role/role.controller';
import { GetRolesUseCase } from './usecases/get-roles/get-roles.usecase';

export const controllersRole = [RoleController];

export const providersRole = [GetRolesUseCase];
