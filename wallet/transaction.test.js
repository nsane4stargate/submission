const { newTransaction } = require('./transaction');
const Transaction = require('./transaction');
const Wallet = require('./wallet');

describe('Transaction', ()=>{
    let wallet, transaction, amount, recipient;

    beforeEach(()=>{
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13nt';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('output the `amount` subtracted from wallet balance', ()=>{
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance-amount);
    })

    it('outputs the recipents amount added',()=>{
        expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
    });

    describe('transaction with an amount exceeds the balance', ()=>{
        beforeEach(()=>{
            amount = 50000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });

        it("does not create the transaction", ()=>{
            expect(transaction).toEqual(undefined);
        })
    });
});