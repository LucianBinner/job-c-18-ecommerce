import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}
