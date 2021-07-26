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
        // 업데이트할 movie의 id랑 우리가 보낼 데이터의 Object를 return
        return {
            // json 형태로 리턴을 준다. express.js에서는 json으로 리턴하려면 설정을 해야하는데 nest에서는 불필요함.
            updatedMovie: movieId,
            ...updateData,
        };
    }

}
