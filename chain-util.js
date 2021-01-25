const EC = require('elliptic').ec;
const {v1: uuidV1 }= require('uuid'); // version 1 timestamp based
//const SHA256 = require('crypto-js/sha256');

const ec = new EC('secp256k1');

class ChainUtil{
    static genKeyPair(){
        return ec.genKeyPair();
    }

    static id(){
        return uuidV1();
    }
}

module.exports = ChainUtil;