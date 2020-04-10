const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v1')
const db = require(__dirname, '/db/db.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync('./db/db.json');
    // console.log('data: ' + data);
    Notes = data;
    // console.log('Notes (get):' + Notes);

    const notes = JSON.parse(data);
    // console.log('notes: ' + notes);
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    var newNote = req.body;

    const newUUID = { "uuid": uuid };
    console.log(newNote);
    // newNote.unshift(newOBJ);
    // newNote.push(newUUID);
    // console.log(newNote);
    console.log(newUUID);
    

    fs.readFile('./db/db.json', function (err, data) {
        var json = JSON.parse(data)
        json.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(json))
    })

    res.json(newNote);
});

app.delete('/api/notes/:id', (reg, res)=> {
    fs.readFile('./db/db.json', function (err, data) {
        var json = JSON.parse(data)
        //find note by id
        //delete note
        
        fs.writeFileSync('./db/db.json', JSON.stringify(json))
    })
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});