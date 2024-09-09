import { UserModel } from '../../../../../user/domain/models/user-model';

export type SaveCto = Omit<UserModel, 'id' | 'isActive' | 'note'>;
