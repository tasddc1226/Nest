// 새로운 커스텀 파이프를 만들어보자
// positiveInt 파이프는 ParseInt 파이프를 거친 후 정수가 양수인지 확인하는 파이프
import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PositiveIntPipe implements PipeTransform {
    // transform 함수의 결과값이 파이프의 결과값 (Task1, Task2 ...)
    transform(value: number) {
        // console.log("PositiveIntPipe: " + value);
        if (value < 0) {
            // Int로 변환 후 값이 음수이면 Exception을 던짐
            throw new HttpException('value < 0', 400);
        }
        return value;
    }
}