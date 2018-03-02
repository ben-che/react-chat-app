const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secret = require("./secret.js");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/hastoken", (req, res) =>
{
    jwt.verify(req.body.jwt, secret, (error, payload) =>
    {
        if (!error)
        {
            res.json(payload);
        }
    });
});

app.post("/setname", (req, res) =>
{
    if (req.body.name && typeof req.body.name && req.body.name.trim() && req.body.name.length <= 15)
    {
        jwt.sign(req.body.name, secret, (error, jwt) =>
        {
            if (!error)
            {
                res.json({jwt: jwt});
            }
        });
    }
});

http.listen(8080, () =>
{
    console.log("The react-chat-app-backend server started successfully.");
});