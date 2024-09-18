import { PrismaConfig } from '@/modules/@shared/config/prisma.config';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../../models/user.model';
import { UpdateCto } from './cto/update.cto';
import { SaveCto } from './cto/save.cto';
import { GetByAccessIdAndNotIdCto } from './cto/get-by-access-id-and-not-id.cto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaConfig) {}

  async getByAccessIdAndNotId(
    cto: GetByAccessIdAndNotIdCto,
  ): Promise<UserModel | null> {
    const { accessId, id } = cto;
    return await this.prisma.user.findFirst({
      where: {
        accessId,
        NOT: {
          id,
        },
      },
    });
  }

  async getByAccessId(accessId: string): Promise<UserModel | null> {
    return await this.prisma.user.findFirst({
      where: {
        accessId,
      },
    });
  }

  async save(cto: SaveCto): Promise<UserModel> {
    const { user } = cto;
    return await this.prisma.user.create({
      data: user,
    });
  }

  async updateById(cto: UpdateCto): Promise<UserModel> {
    const { user, id } = cto;
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: user,
    });
  }
}
