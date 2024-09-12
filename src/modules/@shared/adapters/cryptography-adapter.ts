import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptographyAdapter {
  async hashGenerator(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, Number(process.env.HASH_SALT));
    return hash;
  }
}
