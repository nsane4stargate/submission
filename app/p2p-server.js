const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 8080;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer{
    constructor(mcaMap){
        this.mcaMap = mcaMap;
        this.sockets = [];
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
        this.sockets.push(socket);
        console.log('Socket Connected');

        /* Sends socket with its data to the messageHandler() */
        this.messageHandler(socket);
        this.sendList(socket);
    }

    /* Event handler for newly connected socket */
    messageHandler(socket){
        
        socket.on('message', message =>{
            try{
                console.log(`In message ${this.messageHandler}`);
                const list = JSON.parse(message); 
                console.log(`Message ${message}`);

                /* Attempts to replace list */
                this.mcaMap.replaceList(list);
            }catch(e){
                console.log(`Something went wrong ${e.message}`);
            }
        });
    }

    sendList(socket){
        socket.send(JSON.stringify(this.mcaMap.list));
    }

    syncList(){
        this.sockets.forEach(socket =>{
            this.sendList(socket);
        });
    }
}

module.exports = P2pServer;