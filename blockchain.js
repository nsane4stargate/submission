const Block = require('./block');

class BlockChain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    /* Step 7*/
    addBlock(data){
        const lastBlock = this.chain[this.chain.length - 1];
        /* more condensed */
        /* const block = Block.mineBlock(this.chain[this.chain.length - 1], data) */
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
    }

    /* Step 8 */
    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        
        for(let i = 1; i < chain.length; i++){
            const block = chain[i];
            const lastBlock = chain[i-1];

            if(block.lastHash !== lastBlock.hash ||
                block.hash !== Block.blockHashValidator(block)) {
                    return false;
                }
        }
        return true;
    }
}

module.exports = BlockChain;
