import { Module } from '@nestjs/common';
import { MovieService } from 'src/movies/movies.service';
import { MovieController } from 'src/movies/movies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MoviesModule {}
