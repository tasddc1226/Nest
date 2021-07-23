// Typescript Part 3
// Interfaces on Typescript

// 인터페이스 선언
interface Human {
    name : string;
    age : number;
    gender : string;
}

const person = {
    name: "yang su young",
    age: 25,
    gender: "male"
};

const sayHi = (person : Human): string => {
    return (`Hi There, ${person.name}, you are ${person.age}, you are a ${person.gender}!`);
};

// typescript가 person의 type을 Human 인터페이스와 같은지 확인함.
// 인터페이스는 JS에서 작동을 하지 않는다.
console.log(sayHi(person));

export {};