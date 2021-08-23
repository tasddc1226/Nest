// Typescript Part 8
// Conclustions

// import crypto-js
import * as CryptoJS from "crypto-js";

class Block {
    // static
    static calculateBlockHash = (
        index:number,
        previousHash:string,
        timestamp:number,
        data:string
    ) :string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString()
    
    static validateStructure = (aBlcok: Block) : boolean => 
        typeof aBlcok.index === "number" && 
        typeof aBlcok.hash === "string" && 
        typeof aBlcok.previousHash === "string" &&
        typeof aBlcok.timestamp === "number" &&
        typeof aBlcok.data === "string";
    
    // etc..
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    // constructor
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
    const previousBlock : Block = getLatestBlock();
    // 새로운 index 값을 설정
    const newIndex : number = previousBlock.index + 1;
    // 새로운 timestamp 값 설정
    const newTimestamp : number = getNewTimeStamp();
    // 새로운 Hash 값 설정
    const newHash : string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data
    );
    // 새로운 Block 생성
    const newBlock : Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimestamp
    );
    addBlock(newBlock);
    return newBlock;
};

// block의 hash를 얻어오는 함수
const getHashforBlock = (aBlock: Block) :string => 
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
    );

// 생성된 Block의 구조가 유효한지 검증하는 함수
// candidate block과 previous block을 불러와서 비교함.
// blockchain은 어떤 한 block이 이전 block과 link 되어 있다는 것이 특징임.
const isBlockValid = (candidateBlock : Block, previousBlock : Block) : boolean => {
    // 1단계 : 구조 검증
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    // 2단계 : link 검증 (현재의 block index와 이전 block index + 1 값을 비교)
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    // 3단계 : hash 검증 (이전 block hash가 현재 block의 previous hash 값을 비교)
    } else if (previousBlock.hash !== candidateBlock.previousHash){
        return false;
    // 4단계 : (계산한 hash와 현재의 hash값을 비교)
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) { // 해쉬 블록을 얻어와 candidate block의 해쉬와 같지 않다면
        return false;
    } else {
        return true;
    }
};

// blockchain에 block을 추가
const addBlock = (candidateBlock: Block) : void => {
    if (isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock);
    }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};