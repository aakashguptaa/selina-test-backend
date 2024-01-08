import { Controller, Get, Query } from '@nestjs/common';
import { QueryLocationDto } from '../dto/find-all-location.dto';
import { LocationService } from '../services/location.service';
import { SelinaLocation } from 'src/models/location';

@Controller('locations')
export class LocationController {

  constructor(private locationService: LocationService){}

  // Get Location Via Pagination via limit and offset
  @Get()
  getAllLocations(@Query() query: QueryLocationDto): Promise<Array<SelinaLocation>> {
    return this.locationService.getAllLocations(query);
  }
}