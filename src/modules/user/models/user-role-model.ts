import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserRoleModel {
  @IsNumber()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @IsNumber()
  readonly userId?: number;
}
