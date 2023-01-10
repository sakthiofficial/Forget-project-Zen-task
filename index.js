import express from "express";

import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import userRouter from "./userrouter.js";
import cors from "cors";
import sendMail from "./mailSender.js"
dotenv.config()
console.time()
// console.log(process.env.password);
// Step to start.

// to install node package.
// npm init -y 

// Instal Express.
// npm i epress

// To auto restart the portal.
// install -cmd.
// npm install --save-dev nodemon
// past the code in script obt in pack-json
// ("start": "node index.js", // helps in heroku deployment
// "dev": "nodemon index.js" // shortcut to run nodemon)

// cmd to run in dev -> npm run dev;
// cmd to run in horuku -> npm start;
// import { log, time } from "console";
// let movies;
// var app = express();
dotenv.config()

// Step to start.

// to install node package.
// npm init -y

// Instal Express.
// npm i epress

// To auto restart the portal.
// install -cmd.
// npm install --save-dev nodemon
// past the code in script obt in pack-json
// ("start": "node index.js", // helps in heroku deployment
// "dev": "nodemon index.js" // shortcut to run nodemon)

// cmd to run in dev -> npm run dev;
// cmd to run in horuku -> npm start;
// import { log } from "console";
let movies;
const app = express();
app.use(cors())


const PORT = process.env.PORT;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
app.use(express.json())
// MongoDB Connection.
// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL
// const MONGO_URL = "mongodb://127.0.0.1"

// Mongo Connection With a key to use
const client = new MongoClient(MONGO_URL);
// dail
await client.connect(); // call





app.listen(4220, () => console.log(`The server started in: ${4020} ✨✨`));
console.timeEnd()

app.use("/user", userRouter)



// create mobiles.
app.post("/mobiles", async (req, res) => {
  let data = req.body;

  let result = await client.db("movie").collection("mobiles").insertMany(data);
  res.send(result)
})


export { client };

app.listen(4020, () => console.log(`The server started in: ${PORT} ✨✨`));
// param in get method.

// app.get("/movies/:id" ,async(req,res)=>{
//     const {id} = req.params;
//     res.send()

//     // movies.map(val =>{
//     //     if(val.id == id){
//     //         res.send(val)
//     //     }
//     // })
// })

// get method with db using params .
// export { client };