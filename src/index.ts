// Typescript Part 4
// Classes on Typescript

// ts의 클래스 선언에서는 어떤 속성들을 가져야 하는지 선언이 필요하다.
// public 변수는 class 외부에서 호출 가능하지만
// private 변수는 class 외부에서 호출이 불가능하다.
class Human {
    public name : string;
    public age : number;
    public gender : string;
    constructor(name: string, age: number, gender: string){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const lynn = new Human("Lynn", 24, "female");

const sayHi = (person : Human): string => {
    return (`Hi There, ${person.name}, you are ${person.age}, you are a ${person.gender}!`);
};

// typescript가 person의 type을 Human 인터페이스와 같은지 확인함.
// 인터페이스는 JS에서 작동을 하지 않는다.
console.log(sayHi(lynn));

export {};