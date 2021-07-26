import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll() {
        return "This will return all movies!";
    }

    @Get('search')
    search(@Query('year') searchingYear: string){
        return `we are searching for a movie made after: ${searchingYear}`;
    }

    // 요청 id를 알고싶을때 @Param 데코레이터를 사용함.
    @Get(":id") 
    getOne(@Param('id') movieId: string) {
    return `this will return one movie with the id :${movieId}.`;
    }

    @Post()
    create(@Body() movieData) {
        console.log(movieData);
        return movieData;
    }

    @Delete(":id")
    remove(@Param('id') movieId: string){
        return `this will delete a movie with the id :${movieId}.`;
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
