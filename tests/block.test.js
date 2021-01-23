const Block = require('../blockchain/block');

describe('Block', ()=>{
    let data, lastBlock, block;

    beforeEach(()=>{
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    })

    it('sets the `data` to match the input', ()=>{
        expect(block.data).toEqual(data);
    });

    it('sets the `lastHash` to match the has of the last block', ()=>{
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('generate the has that matches the difficulty',() =>{
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });

    it('lower difficulty for slowly mined blocks', ()=>{
        expect(Block.adjustDifficulty(block, block.timestamp+36000)).toEqual(block.difficulty-1);
    });

    it('raises the difficulty for quickly mined blocks', () =>{
        expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty+1);
    });
    
})