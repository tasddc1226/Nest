import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        // console.log(typeof id); // server id type : string !, test type : numver !
        const movie = this.movies.find(movie => movie.id === id);
        // 없는 movieId의 번호를 요청받았다면?
        if (!movie) {
            // Nest에는 아래와 같은 편리한 기능이 있다.
            throw new NotFoundException(`Movie with ID: ${id} not found.`)
        }
        return movie;
    }

    deleteOne(id: number){
        this.getOne(id); // 해당 movieID 값이 존재하는지 확인
        this.movies = this.movies.filter(movie => movie.id !== id);
        
    }

    create(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    update(id: number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
        
    }
}
