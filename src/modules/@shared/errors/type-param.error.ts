import { BadRequestException } from '@nestjs/common';

export class TypeParamError extends BadRequestException {
  constructor(paramName: string) {
    super(`Type param: ${paramName}`);
    this.name = 'TypeParamError';
  }
}
