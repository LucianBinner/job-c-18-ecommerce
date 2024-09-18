import { UserModel } from '@/modules/@shared/models/user-model';
import { UserRequest } from '@/modules/user/entrypoints/request/user-request';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapUserRequestToCTOHelper {
  map(user: UserRequest): Omit<UserModel, 'id'> {
    return {
      accessId: user.accessId,
      isActive: user.isActive,
      name: user.name,
      note: user.note,
      password: user.password,
    };
  }
}
