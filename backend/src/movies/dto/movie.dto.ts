// movie.dto.ts
import { IsString, IsNumber, IsArray, IsDate, IsEmail } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;

  @IsNumber()
  rating: number;

  @IsArray()
  cast: { name: string; role: string }[];

  @IsString()
  genre: string;

  @IsDate()
  releaseDate: Date;
}

export class UpdateMovieDto {
  @IsString()
  name?: string;

  @IsNumber()
  rating?: number;

  @IsArray()
  cast?: { id?: string; name: string; role: string }[];

  @IsString()
  genre?: string;

  @IsDate()
  releaseDate?: Date;
}
