// Typescript Part 7
// Blockchain Creating a Block 3

// import crypto-js
import * as CryptoJS from "crypto-js";

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    // 해쉬를 계산하기 위한 static method로 외부에서 호출 가능 & block이 없어도 호출 가능
    // static 키워드가 없다면 외부에서 호출이 불가능함.
    static calculateBlockHash = (
        index:number,
        previousHash:string,
        timestamp:number,
        data:string
    ) :string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString()

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

let blockchain: Block[] = [genesisBlock]; 

const getBlockchain = () : Block[] => blockchain;

// 이전 block을 가져오는 함수.
const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000);

// 새로운 Block 생성하는 함수로 리턴값은 Block임.
const createNewBlock = (data:string) : Block => {
    // 이전 block을 가져옴
    const previosBlock : Block = getLatestBlock();
    // 새로운 index 값을 설정
    const newIndex : number = previosBlock.index + 1;
    // 새로운 timestamp 값 설정
    const newTimestamp : number = getNewTimeStamp();
    // 새로운 Hash 값 설정
    const newHash : string = Block.calculateBlockHash(
        newIndex,
        previosBlock.hash,
        newTimestamp,
        data
    );
    // 새로운 Block 생성
    const newBlock : Block = new Block(
        newIndex,
        newHash,
        previosBlock.hash,
        data,
        newTimestamp
    );
    return newBlock;
};

console.log(createNewBlock("hello"), createNewBlock("bye bye"));

export {};