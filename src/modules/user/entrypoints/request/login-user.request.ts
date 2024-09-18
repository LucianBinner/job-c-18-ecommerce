import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
