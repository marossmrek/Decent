var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');

var app = express();

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(expressValidator());
app.use(bodyParser.json());

app.post('/save', (req, res) => {

    req.checkBody('name', 'Name needs to be at least 5 characters long').isLength({min: 5, max: 100});
    req.checkBody('email', 'Not valid email').isEmail();
    req.checkBody('numberOfKids', 'Number of kids is required').notEmpty();
    req.checkBody('accepted', 'Must be accepted').matches(true);
    req.checkBody('files', 'Image is required').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
        let sendErrorMsq = {};
        errors.map((error) => {
            sendErrorMsq[error.param] = error.msg;
        });
        res.send(sendErrorMsq);
    } else(
        res.status(204).end()
    )
});

app.listen(5000, () => {
    console.log("I listen on port 5000");
});