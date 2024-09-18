import { Injectable } from '@nestjs/common';
import { BearerTokenUtilInput } from './bearer-token.util.Input';

@Injectable()
export class BearerTokenUtil {
  getBearerToken(input: BearerTokenUtilInput): string | null {
    const { authorization } = input.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      return token;
    }
  }
}
