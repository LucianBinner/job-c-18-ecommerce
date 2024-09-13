import { GetRolesUseCase } from '@/modules/role/usecases/get-roles/get-roles-usecase';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { GetRoleResponse } from '../../response/get-role-response';

@Controller('/role')
export class RoleController {
  constructor(private readonly getRolesUseCase: GetRolesUseCase) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: Array<GetRoleResponse>,
    description: 'Get Roles User',
  })
  async signUp(): Promise<GetRoleResponse[]> {
    return await this.getRolesUseCase.handle();
  }
}
