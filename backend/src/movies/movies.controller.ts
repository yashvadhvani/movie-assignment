// movie.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MovieService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.movieService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.movieService.findOne(+id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(+id, req.user.sub, updateMovieDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.movieService.remove(+id, req.user.sub);
  }
}
