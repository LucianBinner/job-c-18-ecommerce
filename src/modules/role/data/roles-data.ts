import { RoleModel } from '../models/role-model';

export const roleData: RoleModel[] = [
  {
    role: 'CreateUser',
    name: 'Create User',
    description: 'Allows the user to register new users',
  },
  {
    role: 'DeleteUser',
    name: 'Delete User',
    description: 'Allows the user to delete users',
  },
  {
    role: 'GetRoles',
    name: 'Get Roles',
    description: 'Allows the user to get roles',
  },
];
