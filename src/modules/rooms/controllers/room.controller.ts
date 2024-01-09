import { Body, Controller, Post } from '@nestjs/common';
import { RoomService } from '../services/room.service';
import { BodyBookRoom, BodyRoomAvailability } from '../dto/room-dto';
import { uuid } from 'uuidv4';
import { SelinaRoom } from 'src/models/room';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) { }

  @Post('/check-room-availability')
  checkRoomAvailability(
    @Body() input: BodyRoomAvailability,
  ): Promise<Array<SelinaRoom>> {
    return this.roomService.checkAvailability(input);
  }

  @Post('/book-room')
  async bookRoom(@Body() input: BodyBookRoom): Promise<boolean> {

    // Verify Room Availability Before Booking (should be done via transaction)
    const isRoomAvailable = this.roomService.checkRoomAvailability(input);
    if (!isRoomAvailable) throw new Error(`Sorry Room is already booked`);

    // Book Room If Room is Available
    const roomBookingPayload = {
      id: uuid(),
      roomId: input.roomId,
      checkIn: input.checkInTimestamp,
      checkout: input.checkOutTimestamp,
      createdAt: new Date(),
    };
    const response = await this.roomService.addRoomBooking(roomBookingPayload);
    return response?.insertedId ? true : false;
  }
}
