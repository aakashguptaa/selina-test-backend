import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './modules/locations/location.module';
import { MongoService } from './database/mongo.service';
import { RoomModule } from './modules/rooms/rooms.module';
import { ConfigService } from './config.service';

@Module({
  imports: [LocationModule,RoomModule],
  controllers: [AppController],
  providers: [AppService,MongoService,ConfigService],
})
export class AppModule {}
