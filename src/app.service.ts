import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcome(): string {
    return 'Please Use locations or rooms path';
  }
}
