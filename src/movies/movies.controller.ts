import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    // 서비스를 사용하기 위해서 constructor로 불러옴.
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    // @Get('search')
    // search(@Query('year') searchingYear: string){
    //     return `we are searching for a movie made after: ${searchingYear}`;
    // }

    @Get(":id") 
    getOne(@Param('id') movieId: string): Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData) {
        return this.moviesService.create(movieData);
    }

    @Delete(":id")
    remove(@Param('id') movieId: string){
        return this.moviesService.deleteOne(movieId);
    }

    // 리소스의 일부분만 업데이트 시킴. @Patch
    // 전체 movie를 update 시킴. @Put
    @Patch(':id')
    patch(@Param('id') movieId: string, @Body() updateData){ // 필요한 parameter를 직접 요청해야 사용 가능!
        return this.moviesService.update(movieId, updateData);
    }

}
