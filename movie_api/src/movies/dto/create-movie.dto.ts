// DTO 란?
// Data Transfer Object로 데이터 전송 객체를 의미한다.
// 기본적으로 class의 형태임. 아래의 형태를 통해서만
// 사용자에게 요청한 데이터(movieData or updateData..)를 pipe를 사용하여 검증함.
// 이 기능은 개발자에게 아주 편리한 기능이다.

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto{
    @IsString() // 데코레이터를 사용
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsOptional() // 필수 요소일 필요가 없다.
    @IsString({ each: true })
    readonly genres: string[];
}

// 만약, http://localhost:3000/movies/ 경로에 POST 요청으로 
// 위의 형태가 아닌 사용자의 입력이 들어오게 된다면? => input값을 실시간으로 유효성을 체크함.
// 이를 통해 서버를 보호할 수 있게 됨.

// 결과
// {
//     "statusCode": 400,
//     "message": [
//       "title must be a string",
//       "year must be a number conforming to the specified constraints",
//       "each value in genres must be a string"
//     ],
//     "error": "Bad Request"
//   }