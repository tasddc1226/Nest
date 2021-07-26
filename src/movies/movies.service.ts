import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string): Movie {
        const movie = this.movies.find(movie => movie.id === + id);
        // 없는 movieId의 번호를 요청받았다면?
        if (!movie) {
            // Nest에는 아래와 같은 편리한 기능이 있다.
            throw new NotFoundException(`Movie with ID: ${id} not found.`)
        }
        return movie;
    }

    deleteOne(id: string){
        this.getOne(id); // 해당 movieID 값이 존재하는지 확인
        this.movies = this.movies.filter(movie => movie.id !== + id);
        
    }

    create(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    update(id:string, updateData){
        // updateData의 유효성 검사가 필요함.
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
        
    }
}
