import { CryptographyAdapter } from './adapters';
import { PrismaConfig } from './config/prisma.config';
import { AuthGuard } from './helpers/auth/auth-guard';
import { UserRoleRepository } from './repositories/user-role/user-role-repository';
import { UserRepository } from './repositories/user/user-repository';
import { BearerTokenUtil } from './utils/http/bearer-token-util';

export const providersShared = [
  CryptographyAdapter,
  PrismaConfig,
  UserRepository,
  UserRoleRepository,
  AuthGuard,
  BearerTokenUtil,
];
