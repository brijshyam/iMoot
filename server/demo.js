/* import { MongoClient } from 'mongodb';
const uri = "mongodb+srv://allUsers1:mjAwp7Kiq3we6cO3@thefirstcluster.wqp57qc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
console.log(`done with the initialization...`);

client.connect((err) => {
    console.log(`connection started`);
    client.db.listDatabases((error, databases) => {
        if (error) {
            console.error(`Error listing databases: ${error}`);
            return;
        }
        const chatDBExists = databases.some(db => db.name === "chatDB");
        if (!chatDBExists) {
            console.log(`Database chatDB does not exist. Creating it...`);
            client.db.createCollection("chatDB", (error, response) => {
                if (error) {
                    console.error(`Error creating the chatDB database: ${error}`);
                } else {
                    console.log(`Successfully created the chatDB database: ${response}`);
                }
            });
        } else {
            const db = client.db("chatDB");
            const collection = db.collection("chats");
            console.log(`collection created....`);
        }
    });
});
 */


import { Mongoose } from "mongoose";
const uri = "mongodb+srv://allUsers1:mjAwp7Kiq3we6cO3@thefirstcluster.wqp57qc.mongodb.net/chatDB?retryWrites=true&w=majority";

const mongoose = new Mongoose();

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log(`Connection succesful...`);
}).catch((err) => console.log(`no connection`)
)