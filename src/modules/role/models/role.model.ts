import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoleModel {
  @IsNumber()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
