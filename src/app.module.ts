import { Module } from '@nestjs/common';
import { PrismaConfig } from './config/prisma.config';
import { controllersUser, providersUser } from './modules/user/index';
import { providersShared } from './modules/@shared';

@Module({
  imports: [],
  controllers: [...controllersUser],
  providers: [PrismaConfig, ...providersUser, ...providersShared],
})
export class AppModule {}
