import { RoleModel } from '../models/role-model';

export const roleData: RoleModel[] = [
  {
    role: 'Admin',
    name: 'System Administrator',
    description: 'Allows the user to access all system functionality',
  },
  {
    role: 'UserAdmin',
    name: 'User Administration',
    description: 'Allows the user full access to the user module',
  },
  {
    role: 'CreateUser',
    name: 'Create User',
    description: 'Allows the user to register new users',
  },
  {
    role: 'UpdateUser',
    name: 'Update User',
    description: 'Allows the user to update users',
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
