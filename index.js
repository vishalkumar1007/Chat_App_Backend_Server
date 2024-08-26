import express from 'express';
import {createServer} from 'node:http';
import path from 'path';
import {Server} from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin: ["http://localhost:3000", "http://192.168.117.196:3000"],
        methods: ["GET", "POST"]
    }
});

const PORT = 8081;

app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./public/index.html'));
});

// handel socked connection 

io.on('connection', (socket)=>{
    console.log('connection established id =',socket.id);
    socket.on('user_message',(msg)=>{
        console.log("message from user : " +msg);
        setTimeout(()=>{
            socket.emit('server_message' , `from server: ${msg}`)
        },2000)
        
    });
})


server.listen(PORT , ()=>{
    console.log('server is running on port ', PORT);
})

