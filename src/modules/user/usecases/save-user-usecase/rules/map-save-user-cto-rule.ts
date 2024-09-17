import { Injectable } from '@nestjs/common';
import { SaveCto } from '../../../../@shared/repositories/user/cto/save-cto';
import { SaveUserInput } from '../save-user-input';

@Injectable()
export class MapUserCTORule {
  map(user: SaveUserInput): SaveCto {
    return {
      accessId: user.accessId,
      isActive: user.isActive,
      name: user.name,
      note: user.note,
      password: user.password,
    };
  }
}
