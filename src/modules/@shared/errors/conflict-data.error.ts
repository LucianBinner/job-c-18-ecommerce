import { ConflictException } from '@nestjs/common';

export class ConflictDataError extends ConflictException {
  constructor(data: string) {
    super(`Conflict Data: ${data}`);
    this.name = 'ConflictDAtaError';
  }
}
