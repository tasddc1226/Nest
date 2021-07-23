// Typescript Part 1
// 특징 : 개발자의 조그마한 실수로부터 코드를 보호하는 특징이 있다.

const name = "Yang",
    age = 25,
    gender = "male";

// gender는 선택적인 변수
const sayHi = (name, age, gender?) => {
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
};

// 일반적인 경우
sayHi(name, age, gender); 

// ts에서는 gender를 사용하지 않는 경우 error가 뜨게 된다. 이는 JS에서는 error가 발생하지 않는다.
// sayHi(name, age); 는 컴파일 자체가 불가능하다.

// 하지만 함수 파라메터에 ?를 붙이면 실행 가능.
sayHi(name, age);

export {};