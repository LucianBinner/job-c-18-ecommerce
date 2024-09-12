import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CryptographyAdapter {
  async hashGenerator(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, Number(process.env.HASH_SALT));
    return hash;
  }
  async hashComparer(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }

  async tokenGenerator(params: any): Promise<string> {
    return await jwt.sign(params, process.env.JWT_SECRET, { expiresIn: '1d' });
  }
}
