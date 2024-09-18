import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UnauthorizedError } from '../../errors/unauthorized-error';
import { BearerTokenUtil } from '../../utils/http/bearer-token-util';
import { CryptographyAdapter } from '../../adapters';
import { UserRoleRepository } from '../../repositories/user-role/user-role-repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly bearerTokenUtil: BearerTokenUtil,
    private readonly cryptographyAdapter: CryptographyAdapter,
    private readonly reflector: Reflector,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.bearerTokenUtil.getBearerToken(request);
    if (token) {
      const tokenInfo = await this.cryptographyAdapter.tokenDecrypt<{
        id: number;
      }>(token);
      if (tokenInfo) {
        const permissions = this.reflector.get<string[]>(
          'permissions',
          context.getHandler(),
        );
        const rolesUser = await this.userRoleRepository.getByUserId(
          tokenInfo.id,
        );
        const permissionIsValid = rolesUser.find(
          roleUser =>
            permissions.includes(roleUser.role) || roleUser.role === 'Admin',
        );
        if (tokenInfo && (permissions.length === 0 || permissionIsValid)) {
          request.userId = tokenInfo.id;
          return true;
        }
      }
    }
    throw new UnauthorizedError();
  }
}
