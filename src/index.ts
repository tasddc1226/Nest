// Typescript Part 5
// Blockchain Creating a Block

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock:Block = new Block(0, "2020202020", "", "Hello", 123456);

// type이 Block인 것만 배열에 추가하도록 함.
let blockchain: [Block] = [genesisBlock]; 

// 따라서 아래는 push가 불가능 type이 Block이 아니기 때문!
// blockchain.push("stuff");

console.log(blockchain);

// 많은 function과 많은 type이 존재할 경우 typescript를 사용하여 실수를 줄일 수 있다.

export {};