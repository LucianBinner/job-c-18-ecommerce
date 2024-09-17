import { UserModel } from '@/modules/@shared/models/user-model';

export type SaveCto = Omit<UserModel, 'id'>;
