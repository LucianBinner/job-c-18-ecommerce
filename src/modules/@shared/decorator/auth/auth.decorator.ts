import { SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuardHelper } from '../../helpers/auth/auth-guard.helper';

export function AuthDecorator(permissions: string[] = []) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    SetMetadata('permissions', permissions)(target, key, descriptor);
    UseGuards(AuthGuardHelper)(target, key, descriptor);
  };
}
