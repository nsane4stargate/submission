const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer{
    constructor(blockchain){
        this.blockchain = blockchain;
        this.socket = [];
    }

    listen(){
        /* Socket that will run the application */
        const server = new Websocket.Server({port: P2P_PORT});

        /* listen for connection event*/
        server.on('connection', socket => this.connectSocket(socket));
        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);


        /* listen for later instances that want to connect */
        this.connectToPeer();
    }

    connectToPeer(){
        peers.forEach(peer =>{
            const socket = new Websocket(peer);

            socket.on('open', ()=>this.connectSocket(socket));
        });
    }
    connectSocket(socket){
        this.socket.push(socket);
        console.log('Socket Connected');
    }
}

module.exports = P2pServer;