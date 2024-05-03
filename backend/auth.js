const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
   
    if (!token) {
        res.sendStatus(401);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            res.sendStatus(401);
        }
        req.user = data;
        next();
    });
};

module.exports = auth;
