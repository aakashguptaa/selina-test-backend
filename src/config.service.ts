import { Injectable } from '@nestjs/common';
import * as config from 'config';

@Injectable()
export class ConfigService {
  private readonly config: any;

  constructor() {
    this.config = config;
  }

  get<T>(key: string): T {
    return this.config.get(key);
  }
}