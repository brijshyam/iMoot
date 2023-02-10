import { MongoClient, ServerApiVersion } from 'mongodb';
import { Server } from "socket.io";
import express from 'express';
import { config } from 'dotenv';
config();
const port = process.env.PORT;

const io = new Server();
io.listen(port); //it attaches itslef to an http instance
// console.log(`i am in initialization`);

const app = express();
app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});


const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(`initialization completed.....!`);




//mongodb connection
try {
    console.log(`trying to connect to mongo with client`);
    client.connect((err) => {
        console.log(`connection started`);
        const collection = client.db("chatDB").collection("chats");
        console.log(`collection created....`);
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(`Mongodb connected...`);
    });
} catch (err) {
    console.log(`OOPs!, was unable to make the connecton with the database!!`);
    console.error(err);
}


const users = {} // creating an object for all the connectedd users
console.log(`i am here`);

// creating an instance of socket.io
io.on('connection', socket => {
    // console.log(`hi entered in io.on`);
    socket.on('new-user-joined', name => { //handles particular connection 
        // console.log(`new user has joined with name ${name}`);
        users[socket.id] = name;       // name will be appended in the in the user object 
        socket.broadcast.emit('user-joined', name); //it notifies all users if someone has joined  except the one who joined
    });
    //send message event
    // if someone sends a msg send it to all 
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    //Disconnection event firing
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', { name: users[socket.id] });
        delete users[socket.id];
    });


})





