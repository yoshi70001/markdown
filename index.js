const express = require('express');
const { writeFileSync, fsyncSync } = require('fs');
const jsdocMark = require('jsdoc-to-markdown');
// const showdown = require('showdown'),
//     converter = new showdown.Converter();
const PORT = process.env.PORT || 4000;
const app = express();
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
});
app.use(express.json());
// app.use(cors);


app.get('/', (req, res) => {
    res.status(200).send('<h1>En linea</h1>');
});
app.post('/markdown', (req, res) => {
    try {
        writeFileSync('lib/test.js', req.body.body || '');
        jsdocMark.render({ files: 'lib/test.js' }).then((respo) => {
            res.status(200).send(respo || '');
        });
    } catch (error) {
        res.status(500).send('ERROR al generar');
    }
    // console.log(req.body.body);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
