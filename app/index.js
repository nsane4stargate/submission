const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain/blockchain');


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();

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

    res.redirect('/blocks');
});
app.listen(HTTP_PORT, ()=> console.log(`Listening to port ${HTTP_PORT}`));

