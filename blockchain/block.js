const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY } = require('../config');

class Block{
    /* Step 1 */
    constructor(timestamp, lastHash, hash, data, nonce){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    /* Step 2 */
    toString(){
        return `Block-> 
        Timestamp:  ${this.timestamp}
        Last hash:  ${this.lastHash.substring(0, 10)}
        Hash     :  ${this.hash.substring(0, 10)}
        Nounce   :  ${this.nonce}
        Data     :  ${this.data}`;
    }

    /* Step 3 */
    static genesis(){
        return new this('Genesis time', '------', 'f1r57-h45h', [], 0);
    }

    /* Step 4 */
    static mineBlock(lastBlock, data){
       
        const lastHash = lastBlock.hash;
        let nonce = 0;
        let hash, timestamp; 

        /* Proof of Work*/
        do{
            timestamp = Date.now();
            nonce++;
            hash = Block.hash(timestamp, lastHash, data, nonce);
        }while(hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));
      

        return new this(timestamp, lastHash, hash, data, nonce);
    }

    /* Step 5 */
    static hash(timestamp, lastHash, data, nonce){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    /* Step 9 */
    static blockHashValidator(block){
        return Block.hash(block.timestamp, block.lastHash, block.data, block.nonce);
    }
}

module.exports = Block;