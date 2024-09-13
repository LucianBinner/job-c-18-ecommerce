import { Injectable } from '@nestjs/common';
import { RoleModel } from '../../model/role-model';
import { roleData } from '../../data/roles-data';

@Injectable()
export class GetRolesUseCase {
  constructor() {}
  async handle(): Promise<RoleModel[]> {
    return roleData;
  }
}
