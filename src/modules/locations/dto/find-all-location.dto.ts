import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
} from 'class-validator';


export class QueryLocationDto {
    @Transform(({ value }) => (value ? Number(value) : value))
    @IsNumber()
    limit: number;
  
    @Transform(({ value }) => (value ? Number(value) : value))
    @IsNumber()
    @IsOptional()
    offset: number;
}