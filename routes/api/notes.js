const express = require('express');
const router = express.Router();
var uuid = require('uuid');


router.post('/showNotes', function (req, res) {
    var db = req.app.locals.db;

    db.collection('Notes').find({ createdBy: req.body.email }).toArray((err, result) => {

        res.json(result)

    })


})


router.post('/addNote', function (req, res) {

    var db = req.app.locals.db;

    let obj = { noteId: uuid.v4(), ...req.body }


    db.collection('Notes').insertOne(obj)
        .then((result) => {

            res.json(true)

        })


})

router.put('/editNote', function (req, res) {
    var db = req.app.locals.db;


    db.collection('Notes').updateOne(
        { noteId: req.body.noteId },
        { $set: { "title": req.body.title, "description": req.body.description } })

    res.json(req.body)


})

router.delete('/deleteNotes/:id', function (req, res) {
    var db = req.app.locals.db;

    db.collection('Notes').deleteOne({ noteId: req.params.id });

    res.json(req.body.params);


})




module.exports = router;
