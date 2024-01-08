import { Injectable } from "@nestjs/common";
import { MongoService } from "src/database/mongo.service";
import { QueryLocationDto } from "../dto/find-all-location.dto";
import { ConfigService } from "src/config.service";

@Injectable()
export class LocationService {
  
  constructor(private mongoService:MongoService,private config:ConfigService){}

  async getAllLocations(paginateDetails:QueryLocationDto): Promise<any[]> {
    const db = await this.mongoService.connectToDatabase();

    return db
      .collection(this.config.get("locationCollection"))
      .find()
      .skip(Number(paginateDetails.offset) ?? 0).limit(Number(paginateDetails.limit))
      .toArray();
  }
}