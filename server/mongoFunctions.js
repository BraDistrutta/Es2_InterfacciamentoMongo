"use strict"

let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
const CONNECTIONSTRING = "mongodb://localhost:27017";

let mongoFunctions = function() {}

function setConnection(nomeDb, col, callback){
    let errConn ={codeErr:-1, message:""};
    let collection = null;
    let client = null;
    let mongoConnection = MongoClient.connect(CONNECTIONSTRING);
    mongoConnection.catch((err) => {
        console.log(`Error connecting to MongoDB: ${err}`);
        errConn.codeErr = err.code;
        errConn.message = err.message;
        callback(errConn, collection, client);
    });
    mongoConnection.then((client) => {
        console.log("Connected to MongoDB");
        let db = client.db(nomeDb);
        collection = db.collection(col);
        callback(errConn, collection, client);
    });
}

mongoFunctions.prototype.find = function(nomeDb, col, query, callback){
    setConnection(nomeDb, col, (errConn, collection, conn) => {
        if(errConn.codeErr == -1){
            let dataDB = collection.find(query).toArray();
            dataDB.then((data) => {
                console.log(data);
                let errData = {codeErr:-1, message:""};
                conn.close();
                callback(errData, data);
            });
            dataDB.catch((err) => {
                console.log(`Error finding data: ${err}`);
                let errData = {codeErr:err.code, message:err.message};
                conn.close();
                callback(errData, {});
            });
        } else {
            callback(errConn, {});
        }
    })
};

mongoFunctions.prototype.insert = function(nomeDb, col, query, callback){
    setConnection(nomeDb, col, (errConn, collection, conn) => {
        if(errConn.codeErr == -1){
            let dataDB = collection.insertOne(query);
            dataDB.then((data) => {
                console.log(data);
                let errData = {codeErr:-1, message:""};
                conn.close();
                callback(errData, data);
            });
            dataDB.catch((err) => {
                console.log(`Error inserting data: ${err}`);
                let errData = {codeErr:err.code, message:err.message};
                conn.close();
                callback(errData, {});
            });
        } else {
            callback(errConn, {});
        }
    })
}

mongoFunctions.prototype.update = function(nomeDb, col, query, update, callback){
    setConnection(nomeDb, col, (errConn, collection, conn) => {
        if(errConn.codeErr == -1){
            let dataDB = collection.updateOne(query, update);
            dataDB.then((data) => {
                console.log(data);
                let errData = {codeErr:-1, message:""};
                conn.close();
                callback(errData, data);
            });
            dataDB.catch((err) => {
                console.log(`Error updating data: ${err}`);
                let errData = {codeErr:err.code, message:err.message};
                conn.close();
                callback(errData, {});
            });
        }
        else {
            callback(errConn, {});
        }
    })
}

mongoFunctions.prototype.aggregate = function(nomeDb, col, options, callback){
    setConnection(nomeDb, col, async function (errConn, collection, conn){
        if(errConn.codeErr == -1){
            try{
                let stat = await collection.aggregate(options).toArray();
                let errData = {codeErr:-1,message:""}
                callback(errData, stat)
            }
            catch{
                let errData = {codeErr:err.code,message:err.message}
                callback(errData,{})
            }
            finally{
                await conn.close()
            }
        } else {
            callback(errConn, {});
        }
    })
}

module.exports = new mongoFunctions();
