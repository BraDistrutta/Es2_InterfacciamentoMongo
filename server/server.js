"use strict"
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const mongoFunctions = require('./mongoFunctions');
const app = express();
const port = 8888;

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    let d = new Date();
    console.log(`${d.toLocaleDateString()} >>> ${req.method}: ${req.originalUrl}`);
    if(Object.keys(req.query).length !== 0){
        console.log(`Query parameters: ${JSON.stringify(req.query)}`);
    }
    if(Object.keys(req.body).length !== 0){
        console.log(`Body parameters: ${JSON.stringify(req.body)}`);
    }
    next();
});

app.get("/api/getData", function(req, res){
    mongoFunctions.find("nba","players",{},(err, data) => {
        if(err.codeErr == -1){
            res.send(data);
        } else {
            error(req,res,err)
        }
    });
});

app.post("/api/getPlayerTeam", function(req, res){
    let query = {squadra:req.body.team};
    mongoFunctions.find("nba","players",query,(err, data) => {
        if(err.codeErr == -1){
            res.send(data);
        } else {
            error(req,res,err)
        }
    });
});

app.post("/api/insertPlayer", function(req, res){
    let player = {_id:req.body.id, 
        nome:req.body.nome,
        punti:parseInt(req.body.punti),
        eta:parseInt(req.body.eta),
        conference:req.body.conference, 
        ruolo:req.body.ruolo,
        squadra:req.body.squadra};
    mongoFunctions.insert("nba","players",player,(err, data) => {
        if(err.codeErr == -1){
            res.send(data);
        } else {
            error(req,res,err)
        }
    });
});

app.post("/api/updatePlayer", function(req, res){
    let query = {_id:req.body.id};
    let update = {$set:{
        punti:parseInt(req.body.punti),
        conference:req.body.conference,
        squadra:req.body.squadra
    }};
    mongoFunctions.update("nba","players",query,update,(err, data) => {
        if(err.codeErr == -1){
            res.send(data);
        } else {
            error(req,res,err)
        }
    });
});

app.post("/api/statTeam", function(res,req){
    let options = [{
        $group:{
            _id:"$squadra",
            totPunti:{$sum:"$punti"},
            etaMedia:{$avg:"$eta"}
        }
    }];
    mongoFunctions.aggregate("nba","players",options,(err, data) => {
        if(err.codeErr == -1){
            res.send(data);
        } else {
            error(req,res,err)
        }
    })
})

function error(req, res, err){
    res.status(err.codeErr).send(err.message);
}

