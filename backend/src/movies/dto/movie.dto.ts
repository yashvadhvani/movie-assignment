// movie.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsDate } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Lagan', description: 'Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 4, description: 'Rating' })
  @IsNumber()
  rating: number;

  @ApiProperty({
    example: [
      {
        name: 'Abhishek',
        role: 'Hero',
      },
    ],
    description: 'Cast',
  })
  @IsArray()
  cast: { name: string; role: string }[];

  @ApiProperty({
    example: 'Danger',
    description: 'Genre',
  })
  @IsString()
  genre: string;

  @ApiProperty({
    example: '08/11/2023',
    description: 'Release Date',
  })
  @IsDate()
  releaseDate: Date;
}

export class UpdateMovieDto {
  @IsString()
  @ApiProperty({ example: 'Lagan', description: 'Name' })
  name?: string;

  @IsNumber()
  @ApiProperty({ example: 4, description: 'Rating' })
  rating?: number;

  @ApiProperty({
    example: [
      {
        name: 'Abhishek',
        role: 'Hero',
      },
    ],
    description: 'Cast',
  })
  @IsArray()
  cast?: { id?: string; name: string; role: string }[];

  @ApiProperty({
    example: 'Danger',
    description: 'Genre',
  })
  @IsString()
  genre?: string;

  @ApiProperty({
    example: '08/11/2023',
    description: 'Release Date',
  })
  @IsDate()
  releaseDate?: Date;
}
