import express from "express";

import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import userRouter from "./userrouter.js";
import cors from "cors";
import sendMail from "./mailSender.js"
dotenv.config()



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

const client = new MongoClient(MONGO_URL);
// dail
await client.connect(); // call



app.use("/user", userRouter)



// create mobiles.
app.post("/mobiles", async (req, res) => {
  let data = req.body;

  let result = await client.db("movie").collection("mobiles").insertMany(data);
  res.send(result)
})


app.listen(4220, () => console.log(`The server started in: ${4020} ✨✨`));
// export { client };


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