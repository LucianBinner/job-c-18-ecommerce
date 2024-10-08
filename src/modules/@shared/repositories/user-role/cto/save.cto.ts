import { UserModel } from '@/modules/@shared/models/user.model';
import { UserRoleModel } from '@/modules/@shared/models/user-role.model';

export type SaveCto = {
  user: UserModel;
  role: Omit<UserRoleModel, 'id'>;
};
