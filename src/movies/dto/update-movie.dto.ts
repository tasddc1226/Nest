import { IsNumber, IsString } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from './create-movie.dto';

// 방법 1
// 모든 입력에 대해서 필요가 없으므로 ? 를 붙여서
// 해당 입력에 대해서만 검증 작업을 처리하도록 함.
// 사용자가 제목만 바꾸고싶다 or 년도만 바꾸고 싶다 등등..
// export class UpdateMovieDto {
//     @IsString() 
//     readonly title?: string;

//     @IsNumber()
//     readonly year?: number;

//     @IsString({ each: true }) 
//     readonly genres?: string[];
// }
    
// 방법 2
// NestJs의 기능 중 partial types 사용하기 위해서
// npm i @nestjs/mapped-types 모듈 설치
// update는 create와는 다르게 데이터를 부분적으로 사용하기 때문
export class UpdateMovieDto extends PartialType(CreateMovieDto){}