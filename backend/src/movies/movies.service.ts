// movie.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto, id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return this.prisma.movie.create({
      data: {
        name: createMovieDto.name,
        rating: Number(createMovieDto.rating),
        genre: createMovieDto.genre,
        releaseDate: new Date(createMovieDto.releaseDate),
        cast: {
          create: createMovieDto.cast,
        },
        createdById: user.id,
      },
      include: {
        cast: true,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.movie.findMany({
      where: {
        createdById: userId,
      },
      include: {
        cast: true,
      },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.movie.findUnique({
      where: { id, createdById: userId },
      include: { cast: true },
    });
  }

  async update(id: number, userId: number, updateMovieDto: UpdateMovieDto) {
    const data = {
      name: updateMovieDto.name || undefined,
      rating: updateMovieDto.rating || undefined,
      genre: updateMovieDto.genre || undefined,
      releaseDate: updateMovieDto.releaseDate || undefined,
      cast: undefined,
    };
    if (updateMovieDto.cast) {
      data.cast = {
        upsert: updateMovieDto.cast.map((castMember) => ({
          where: { id: castMember.id || undefined }, // Specify the ID of an existing cast member to update
          create: { name: castMember.name, role: castMember.role },
          update: { name: castMember.name, role: castMember.role },
        })),
      };
    }
    return this.prisma.movie.update({
      where: { id, createdById: userId },
      data,
      include: { cast: true },
    });
  }

  async remove(id: number, userId: number) {
    return this.prisma.movie.delete({
      where: { id, createdById: userId },
      include: { cast: true },
    });
  }
}
