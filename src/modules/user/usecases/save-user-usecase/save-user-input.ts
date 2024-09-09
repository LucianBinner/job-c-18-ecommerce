import { UserModel } from '../../domain/models/user-model';

export type SaveUserInput = Omit<UserModel, 'id' | 'isActive' | 'note'>;
