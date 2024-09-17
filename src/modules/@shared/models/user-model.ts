import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserModel {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;

  @IsNotEmpty()
  @IsString()
  readonly accessId: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsString()
  readonly note: string;
}
