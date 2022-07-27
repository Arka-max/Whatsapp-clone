//importing 
import express from 'express'
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';


//app config
const app=express();
const port=process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1443163",
    key: "674d911d16b306833ef3",
    secret: "95471c251eb1b7811d89",
    cluster: "ap2",
    useTLS: true
  });
//middleware

app.use(express.json()); 

app.use((req, res, next) =>
{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
})

//DB config
const connection_url='mongodb+srv://arka:jhju5X6qHQD2kchR@cluster0.udnc6ff.mongodb.net/whatsappdb?retryWrites=true&w=majority'

mongoose.connect(connection_url)

//????

const db = mongoose.connection

db.once('open',()=>
{
    console.log("DB is connected");

    const msgCollection=db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>
    {
        console.log("A Change ocured",change);

        if(change.operationType == 'insert')
        {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",
            {
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received,
            })
        }
        else
        {
            console.log("Error triggering Pusher")
        }
    })
})

// api routes
app.get('/',(req,res)=>res.status(200).send('Hello World'))

app.get('/messages/sync',(req,res) => 
{
    Messages.find((err,data) =>
    {
        if(err)
        {
            res.status(500).send(err)
        }
        else
        {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new',(req,res)=>
{
    const dbMessage = req.body

    Messages.create(dbMessage, (err,data) =>
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(201).send(data);
        }
    })
})

//listen
app.listen(port,()=>console.log(`Listening on localhost:${port}`))