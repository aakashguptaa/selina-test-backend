import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsString,
} from 'class-validator';


export class BodyRoomAvailability {
    @IsString()
    locationId: string;
    
    @IsNumber()
    checkInTimestamp: number;

    @IsNumber()
    checkOutTimestamp: number;
}


export class BodyBookRoom {
  @IsString()
  roomId: string;
  
  @IsNumber()
  checkInTimestamp: number;

  @IsNumber()
  checkOutTimestamp: number;
}