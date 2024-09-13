import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UserModel {
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
