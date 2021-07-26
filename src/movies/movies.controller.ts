import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll() {
        return "This will return all movies!";
    }

    // 요청 id를 알고싶을때 @Param 데코레이터를 사용함.
    @Get("/:id") 
    getOne(@Param('id') movieId: string) {
    return `this will return one movie with the id :${movieId}.`;
    }

    @Post()
    create() {
        return 'this will create a movie';
    }

    @Delete("/:id")
    remove(@Param('id') movieId: string){
        return `this will delete a movie with the id :${movieId}.`;
    }

    // 리소스의 일부분만 업데이트 시킴. @Patch
    // 전체 movie를 update 시킴. @Put
    @Patch('/:id')
    patch(@Param('id') movieId: string){
        return `this will patch a movie with the id :${movieId}.`;
    }

}
