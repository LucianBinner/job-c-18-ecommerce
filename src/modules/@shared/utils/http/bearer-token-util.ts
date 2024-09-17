import { Injectable } from '@nestjs/common';
import { RequestInputUtil } from './bearer-token-util-input';

@Injectable()
export class BearerTokenUtil {
  getBearerToken(input: RequestInputUtil): string | null {
    const { authorization } = input.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      return token;
    }
  }
}
