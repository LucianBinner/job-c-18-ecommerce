import { PrismaConfig } from '@/config/prisma.config';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../../models/user-model';
import { SaveCto } from './cto/save-cto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaConfig) {}

  async getByAccessId(accessId: string): Promise<UserModel | null> {
    return await this.prisma.user.findFirst({
      where: {
        accessId,
      },
    });
  }

  async save(user: SaveCto): Promise<UserModel> {
    return await this.prisma.user.create({
      data: user,
    });
  }
}
