// Typescript Part 2
// Types in Typescript

// tsc-watch 를 사용하여 .ts의 내용을 바꿀때마다
// 컴파일되어 dist의 내용이 바뀐다.

const sayHi = (name:string, age:number, gender:string): string => {
    return (`Hello ${name}, you are ${age}, you are a ${gender}!`);
};

console.log(sayHi("Yang", 25, "male"));

export {};