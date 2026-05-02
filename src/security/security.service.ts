import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SecurityService {
  private readonly alg = 'aes-256-ctr';
  private readonly pwd = 'apolou_122';

  async encrypt(text: string) {
  }
}
