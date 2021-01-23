const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block{
    /* Step 1 */
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY; /* DIFFICULTY is for the genesis block */
    }

    /* Step 2 */
    toString(){
        return `Block-> 
        Timestamp :  ${this.timestamp}
        Last hash :  ${this.lastHash.substring(0, 10)}
        Hash      :  ${this.hash.substring(0, 10)}
        Nounce    :  ${this.nonce}
        Difficulty:  ${this.difficulty}
        Data      :  ${this.data}`;
    }

    /* Step 3 */
    static genesis(){
        return new this('Genesis time', '------', 'f1r57-h45h', [], 0, DIFFICULTY);
    }

    /* Step 4 */
    static mineBlock(lastBlock, data){
       
        const lastHash = lastBlock.hash;
        let nonce = 0;
        let { difficulty } = lastBlock;
        let hash, timestamp; 

        /* Proof of Work*/
        do{
            timestamp = Date.now();
            nonce++;
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        }while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));
      

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
    /* Step 5 */
    static hash(timestamp, lastHash, data, nonce, difficulty){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    /* Step 9 */
    static blockHashValidator(block){
        return Block.hash(block.timestamp, block.lastHash, block.data, block.nonce, block.difficulty);
    }
}

module.exports = Block;