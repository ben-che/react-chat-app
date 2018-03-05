// packages required for chat app

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// secret.js is added into the gitignore file, so we do not have it

const secret = require("./secret.js");

// starts the id counter as soon as the server starts

let idCounter = 0;

// allow cors and body parser setup

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// this route checks to see if a specific user has a valid jwt token, and sends the payload
//      back to the user if they have a valid jwt token

app.post("/hasvalidtoken", (req, res) =>
{
    jwt.verify(req.body.jwt, secret, (error, payload) =>
    {
        if (!error)
        {
            res.json(payload);
        }
    });
});

// this route accepts user's input, validates it, and returns a new json token for future
//      validation

app.post("/adduser", (req, res) =>
{
    // perform the same checks as we did in the front end to ensure that we catch all errors (in case
    //      someone tries to tamper with the code in the front end)

    if (req.body.username && typeof req.body.username && req.body.username.trim() && req.body.username.length <= 15)
    {
        // apply the secret key to the name that the user inputted, and return a jwt token to
        //      the user for future validation if the name found in the request body is valid

        const user = {
            id: idCounter,
            username: req.body.username,
            alias: req.body.username + "#" + idCounter
        };

        jwt.sign(user, secret, (error, token) =>
        {
            // if all is well, send back a scrambled jwt to the user

            if (!error)
            {
                idCounter++;
                res.json({jwt: token});
            }
        });
    }
});

http.listen(8080, () =>
{
    console.log("The react-chat-app-backend server started successfully.");
});