const express = require('express');
const bodyParser = require('body-parser');
const McaList = require('../mcaList/mcaList');
const P2pServer = require('./p2p-server');


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const mcaList = new McaList();
const p2pServer = new P2pServer(mcaList);

/* Be able to recieve message in json format*/
app.use(bodyParser.json());

/* GET request */
app.get('/available', (req, res) =>{
    /* send RESPONES "res" object in JSON form */
    
    console.log(`In GET: mcaList = ${mcaList.list}`);
    
    res.json(mcaList.list);
});

/* POST response to add address back to list */
app.post('/checkout', (req, res)=>{

    console.log(`Response in post ${res}`);

    const checkinAddress = mcaList.checkOutAddress((req.body.data));

    console.log(`New address checked : ${checkinAddress.toString()}`);

    p2pServer.syncList();
    res.redirect('/available');
});

app.listen(HTTP_PORT, ()=> console.log(`Listening to port ${HTTP_PORT}`));

/* Start the Websocket Server */
p2pServer.listen();