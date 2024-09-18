import { BadRequestException } from '@nestjs/common';

export class InvalidParamError extends BadRequestException {
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.name = 'InvalidParamError';
  }
}
