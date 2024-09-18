import { UserModel } from '@/modules/@shared/models/user.model';

export type SaveCto = {
  user: Omit<UserModel, 'id'>;
};
