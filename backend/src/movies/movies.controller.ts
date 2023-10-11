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
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a Movie (Login Required)' })
  @ApiBody({ type: CreateMovieDto }) // LoginDto defines the request body schema
  create(@Request() req, @Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Find all Movies (Login Required)' })
  findAll(@Request() req) {
    return this.movieService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Find Movie by id  (Login Required)' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.movieService.findOne(+id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update Movie by id  (Login Required)' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(+id, req.user.sub, updateMovieDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Movie by id  (Login Required)' })
  remove(@Request() req, @Param('id') id: string) {
    return this.movieService.remove(+id, req.user.sub);
  }
}
