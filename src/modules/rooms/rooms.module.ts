import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { RoomController } from './controllers/room.controller';
import { MongoService } from 'src/database/mongo.service';
import { ConfigService } from 'src/config.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService,MongoService,ConfigService],
})
export class RoomModule {}
