const ChainUtil = require('../chain-util');


class Transaction{
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    static newTransaction(sendersWallet, recipient, amount){
        const transaction = new this;

        if(amount > sendersWallet.balance){
            console.log(`Amount: ${amount} exceeds balance`);
            return;
        }

        transaction.outputs.push(...[
            {amount: sendersWallet.balance - amount, address: sendersWallet.publicKey},
            {amount, address: recipient}
        ]); 
        
        return transaction;
    }
}

module.exports = Transaction; 