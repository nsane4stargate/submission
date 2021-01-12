const Block = require('../blockchain/block');
const BlockChain = require('../blockchain/blockchain');

describe('Blockchain', ()=>{
    let bc, bc2;

    beforeEach(()=>{
        bc = new BlockChain();
        bc2 = new BlockChain();
    })

    it('starts with the genesis block', ()=>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    })

    it('adds a new block', ()=>{
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });

    it('validates a valid chain', ()=>{
        bc2.addBlock('foo');

       expect(bc.isValidChain(bc2.chain)).toBe(true);
     });
})