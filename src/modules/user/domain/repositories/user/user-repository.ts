import { UserModel } from '../../../../user/domain/models/user-model';
import { SaveCto } from './ctos/save-cto';

export interface UserRepository {
  getByAccessId(accessId: string): Promise<UserModel | null>;
  save(userCto: SaveCto): Promise<UserModel>;
}
