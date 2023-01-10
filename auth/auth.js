import jwt from "jsonwebtoken";

export function auth(req, res, next) {
    let token = req.header("auth-token");
    try {
        let result = jwt.verify(token, "Secrate")
        console.log("success");
        next()

    } catch (err) {
        res.status(401).send(err.message);
    }
    // console.log(token);

}
export function auth2(req, res, next) {
    let token = req.query.token;
    console.log(token);
    let result = jwt.verify(token, "Secrate-key2")
    try {
        let result = jwt.verify(token, "Secrate-key2")
        console.log("success");
        next()

    } catch (err) {
        res.status(401).send(err.message);
    }
    // console.log(token);

}