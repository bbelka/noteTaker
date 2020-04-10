const express = require('express');
const path = require('path');
const fs = require('fs');

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
    Notes = data;
    const notes = JSON.parse(data);
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    var newNote = req.body;

    fs.readFile('./db/db.json', function (err, data) {
        var json = JSON.parse(data)
        const id = json[json.length - 1].id;
        newNote.id = id + 1;
        json.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(json))
    })
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', function (err, data) {
        const json = JSON.parse(data);
        console.log('json before: ' + json);
        
        json.forEach(element => {
            if (json.id === req.id){
                const index = json.indexOf(element);
                if (index > -1) {
                    json.splice(index, 1);
                }
            }
            console.log('json after: ' + json);
        });
        fs.writeFileSync('./db/db.json', JSON.stringify(json));
        res.json(json);
    })
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});