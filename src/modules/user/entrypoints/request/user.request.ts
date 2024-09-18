import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class UserRoleRequest {
  @IsNotEmpty()
  @IsString()
  readonly role: string;
}

export class UserRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  note: string = '';

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsObject({ each: true })
  roles: UserRoleRequest[] = [];
}
