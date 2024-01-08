import { Injectable } from '@nestjs/common';
import { MongoService } from 'src/database/mongo.service';
import { BodyBookRoom, BodyRoomAvailability } from '../dto/room-dto';
import { InsertOneResult } from 'mongodb';
import { ConfigService } from 'src/config.service';

@Injectable()
export class RoomService {

  /* ---------------------------- Config Variables ---------------------------- */
  roomCollection;
  roomBookingCollection;

  /* -------------------------- Dependency Injections ------------------------- */
  constructor(private mongoService: MongoService, private config: ConfigService) {
    this.roomCollection = this.config.get("roomCollection")
    this.roomBookingCollection = this.config.get("roomBookingCollection")
  }

  // Using LookUp Query To Filter Booked Rooms For a Location
  async checkAvailability(input: BodyRoomAvailability): Promise<any[]> {
    const db = await this.mongoService.connectToDatabase();
    const response = await db
      .collection(this.roomCollection)
      .aggregate([
        { $match: { locationId: input.locationId } },
        {
          $lookUp: {
            from: this.roomBookingCollection,
            let: { room_Id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$$room_Id', '$roomId'] }, // Match room IDs
                      { $lte: ['$checkIn', input.checkOutTimestamp] },
                      { $gte: ['$checkout', input.checkInTimestamp] },
                    ],
                  },
                },
              },
            ],
            as: 'bookings',
          },
        },
        {
          bookings: { $size: 0 },
        },
      ])
      .toArray();
    return response;
  }

  // Using Find Query To Filter Booked Room For a RoomId
  async checkRoomAvailability(input: BodyBookRoom): Promise<any[]> {
    const db = await this.mongoService.connectToDatabase();

    return db
      .collection(this.roomBookingCollection)
      .find({
        roomId: input.roomId,
        $and: [
          { $lte: ['$checkIn', input.checkOutTimestamp] },
          { $gte: ['$checkout', input.checkInTimestamp] },
        ],
      })
      .toArray();
  }

  // Add Room Booking
  async addRoomBooking(payload: any): Promise<InsertOneResult<Document>> {
    const db = await this.mongoService.connectToDatabase();
    return db
      .collection(this.roomBookingCollection)
      .insertOne(payload);
  }
}
