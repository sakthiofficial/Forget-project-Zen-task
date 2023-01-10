import express from "express";
import { client } from "./index.js";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import { auth, auth2 } from "./auth/auth.js";
import sendMail from "./mailSender.js";
import { log } from "console";


const userRouter = express.Router();


userRouter.post("/signup", async (req, res) => {
    let data = req.body;
    let users = await client.db("movie").collection("users").findOne({ "name": data.name })
    if (users) {
        res.status(401).send("This username already as been used")

    } else {
        let password = await hashing(data.password);

        data.password = password
        let result = await client.db("movie").collection("users").insertOne(data)
        res.status(200).send("Sucessfully Singup")
    }
    console.log(users);

})
// Hashing.
// Installation -> npm i bcrypt.
async function hashing(password) {
    // mention the rounds.
    let rounds = 10;
    // use salting.

    let salting = await bcrypt.genSalt(rounds);

    // hash the password and salt.

    let hashing = await bcrypt.hash(password, salting);
    return hashing;

}

userRouter.post("/login", async (req, res) => {
    let data = req.body;
    let users = await client.db("movie").collection("users").findOne({ "name": data.name })

    if (users) {
        // console.log();
        let token = jwt.sign({ id: users._id }, "Secrate")
        console.log(token);


        let passwordCheck = await bcrypt.compare(data.password, users.password);
        if (passwordCheck) {
            res.send({ message: "login SuccessFully", token: token })
        } else {

            res.status(401).send("Invalid Username or password")
        }
    } else {
        res.status(404).send("Invalid Username or password")

    }

})
userRouter.post("/resetpassword", async (req, res) => {

    let data = req.body;
    let token = jwt.sign({ id: data.name }, "Secrate-key2");
    let result = await client.db("movie").collection("users").findOne({ "name": data.name })
    if (result) {
        if (result.email == data.email) {
            // let token = jwt.sign({id:result._id},)

            res.status(200).send("Sucecss")
            let updateUser = await client.db("movie").collection("users").updateOne({ "name": data.name }, { $set: { otp: 1234 } })
            sendMail("sakthiroky123@gmail.com", `http://localhost:3000/updatepassword?token=${token}&name=${data.name}`)

        } else {
            res.status(401).send("wrong")
            console.log("wrong");
        }
    } else {
        res.status(401).send("wrong")
        console.log("wrong");

    }
})
userRouter.put("/newpassword", auth2, async (req, res) => {
    let data = req.query.name;
    let password = await hashing(req.body.password)
    // console.log(data);
    let result = await client.db("movie").collection("users").updateOne({ name: data }, { $set: { password: password } })
    if (result.acknowledged) {
        res.status(200).send("success")
    } else {
        res.status(401)
    }
})

export default userRouter;