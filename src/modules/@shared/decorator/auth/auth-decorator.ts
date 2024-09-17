import { SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../helpers/auth/auth-guard';

export function Auth(permissions: string[] = []) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    SetMetadata('permissions', permissions)(target, key, descriptor);
    UseGuards(AuthGuard)(target, key, descriptor);
  };
}
