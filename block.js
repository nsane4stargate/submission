const SHA256 = require('crypto-js/sha256');

class Block{
    
    /* Step 1 */
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    /* Step 2 */
    toString(){
        return `Block-> 
        Timestamp:  ${this.timestamp}
        Last hash:  ${this.lastHash.substring(0, 10)}
        Hash     :  ${this.hash.substring(0, 10)}
        Data     :  ${this.data}`;
    }

    /* Step 3 */
    static genesis(){
        return new this('Genesis time', '------', 'f1r57-h45h', []);
    }

    /* Step 4 */
    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
    }

    /* Step 5 */
    static hash(timestamp, lastHash, data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}

module.exports = Block;