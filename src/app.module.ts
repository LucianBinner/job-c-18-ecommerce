import { Module } from '@nestjs/common';
import { PrismaConfig } from './config/prisma.config';
import { controllersUser, providersUser } from './modules/user/index';
import { providersShared } from './modules/@shared';
import { controllersRole, providersRole } from './modules/role';

@Module({
  imports: [],
  controllers: [...controllersUser, ...controllersRole],
  providers: [
    PrismaConfig,
    ...providersUser,
    ...providersShared,
    ...providersRole,
  ],
})
export class AppModule {}
