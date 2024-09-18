import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { GetRoleResponse } from '../../response/get-role.response';
import { AuthDecorator } from '@/modules/@shared/decorator/auth/auth.decorator';
import { GetRolesUseCase } from '@/modules/role/usecases/get-roles/get-roles.usecase';

@Controller('/role')
export class RoleController {
  constructor(private readonly getRolesUseCase: GetRolesUseCase) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: Array<GetRoleResponse>,
    description: 'Get Roles User',
  })
  @AuthDecorator(['GetRoles', 'UserAdmin'])
  async signUp(): Promise<GetRoleResponse[]> {
    return await this.getRolesUseCase.handle();
  }
}
