var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');

var app = express();

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(bodyParser.json());

app.post('/save', (req, res) => {
    let allFormData = [];
    fs.exists('formData.json', (exists) => {
        if (exists) {
            fs.readFile('formData.json', 'utf-8', function readFileCallback(err, data) {
                if (err) {
                    res.status(500).end();
                } else {
                    allFormData = JSON.parse(data);
                    allFormData.push(req.body);
                    fs.writeFile('formData.json', JSON.stringify(allFormData), (err) => {
                        err ? res.status(500).end() : res.status(204).end();
                    })
                }
            });
        } else {
            allFormData.push(req.body);
            fs.writeFile('formData.json', JSON.stringify(allFormData), (err) => {
                err ? res.status(500).end() : res.status(204).end();
            })
        }
    })
});

app.listen(5000, () => {
    console.log("I listen on port 5000");
});