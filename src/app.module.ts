import { Module } from '@nestjs/common';
import { providersShared } from './modules/@shared';
import { controllersRole, providersRole } from './modules/role';
import { controllersUser, providersUser } from './modules/user/index';

@Module({
  imports: [],
  controllers: [...controllersUser, ...controllersRole],
  providers: [...providersUser, ...providersShared, ...providersRole],
})
export class AppModule {}
