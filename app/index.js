const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain/blockchain');
const P2pServer = require('./p2p-server');


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

/* Be able to recieve message in json format*/
app.use(bodyParser.json());

/* GET request */
app.get('/blocks', (req, res)=>{
    /* send RESPONES "res" object in JSON form */
    res.json(bc.chain);
});

/* POST response */
app.post('/mine', (req, res)=>{
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    p2pServer.synchChains();
    res.redirect('/blocks');
});
app.listen(HTTP_PORT, ()=> console.log(`Listening to port ${HTTP_PORT}`));

/* Start the Websocket Server */
p2pServer.listen();