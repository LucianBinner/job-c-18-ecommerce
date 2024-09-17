import { GetRolesUseCase } from '@/modules/role/usecases/get-roles/get-roles-usecase';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { GetRoleResponse } from '../../response/get-role-response';
import { Auth } from '@/modules/@shared/decorator/auth/auth-decorator';

@Controller('/role')
export class RoleController {
  constructor(private readonly getRolesUseCase: GetRolesUseCase) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: Array<GetRoleResponse>,
    description: 'Get Roles User',
  })
  @Auth(['GetRoles'])
  async signUp(): Promise<GetRoleResponse[]> {
    return await this.getRolesUseCase.handle();
  }
}
