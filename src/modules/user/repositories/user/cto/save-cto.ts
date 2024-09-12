import { UserModel } from '@/modules/user/models/user-model';

export type SaveCto = Omit<UserModel, 'id'>;
