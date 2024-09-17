import { PrismaConfig } from '@/modules/@shared/config/prisma.config';
import { Injectable } from '@nestjs/common';
import { UserRoleModel } from '../../models/user-role-model';
import { SaveCto } from './cto/save-cto';
import { SaveManyCto } from './cto/save-many-cto';

@Injectable()
export class UserRoleRepository {
  constructor(private prisma: PrismaConfig) {}

  async getByUserId(userId: number): Promise<UserRoleModel[]> {
    return await this.prisma.userRole.findMany({
      where: {
        userId,
      },
    });
  }

  async saveMany(saveManyParams: SaveManyCto): Promise<void> {
    const { user, roles } = saveManyParams;
    for await (const role of roles) {
      await this.save({ role, user });
    }
  }

  async save(saveParams: SaveCto): Promise<UserRoleModel> {
    const { role, user } = saveParams;
    return await this.prisma.userRole.create({
      data: {
        role: role.role,
        userId: user.id,
      },
    });
  }
}
