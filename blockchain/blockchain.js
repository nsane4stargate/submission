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

    /*Step 10 */
    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            console.log('Recieved chain is not longer than the current chain');
            return; 
        }else if( !this.isValidChain(newChain)){
            console.log('The recieved chain is not valid');
            return;
        }
        console.log('Replacing blockchain with the new chain');
        this.chain = newChain;
    }
}

module.exports = BlockChain;
