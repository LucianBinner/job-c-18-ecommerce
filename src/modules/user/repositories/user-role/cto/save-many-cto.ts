import { UserModel } from '@/modules/user/models/user-model';
import { UserRoleModel } from '@/modules/user/models/user-role-model';

export type SaveManyCto = {
  user: UserModel;
  roles: UserRoleModel[];
};
