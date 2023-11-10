const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());


const path = require('path');
const directoryPath = path.join(__dirname, 'music');

const files = []
const fs = require('fs');

fs.readdir(directoryPath, function (err, searchFiles) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    searchFiles.forEach(function (file) {
        files.push(file);
    });
});


app.get("/getSongs", async(req, res) => {
    try {
        res.send(files);
    } catch (error) {
        res.send(error)
    }
})


app.listen(3001, () => {
    console.log("SERVER UP");
  });