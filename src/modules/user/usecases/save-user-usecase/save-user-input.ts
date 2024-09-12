import { UserModel } from '../../models/user-model';

export type SaveUserInput = Omit<UserModel, 'id'>;
