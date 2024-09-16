import { UserModel } from '@/modules/user/models/user-model';
import { UserRoleModel } from '@/modules/user/models/user-role-model';

export type SaveCto = {
  user: UserModel;
  role: Omit<UserRoleModel, 'id'>;
};
