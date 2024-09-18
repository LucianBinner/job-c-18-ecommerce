import { UserModel } from '@/modules/@shared/models/user-model';

export type UpdateCto = {
  id: number;
  user: Omit<UserModel, 'id'>;
};
