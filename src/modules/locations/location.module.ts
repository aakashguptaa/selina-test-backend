import { Module } from '@nestjs/common';
import { LocationController } from './controllers/location.controller';
import { LocationService } from './services/location.service';
import { MongoService } from 'src/database/mongo.service';
import { ConfigService } from 'src/config.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService,MongoService,ConfigService],
})
export class LocationModule {}
