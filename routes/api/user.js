const express = require('express');
const router = express.Router();


router.post('/addUser', function (req, res) {
    var db = req.app.locals.db;

    db.collection('Users').find({ email: req.body.email }).toArray((err, result) => {



        if (result.length === 0) {

            db.collection('Users').insertOne(req.body)
                .then((result) => {
                    res.json(false)
                })


        }
        else {

            res.json(true)

        }
    })
})

router.post('/verifyUser', function (req, res) {

    var db = req.app.locals.db;



    db.collection('Users').find({ email: req.body.email }).toArray(function (err, result) {



        if (result.length === 0) {


            res.json(1)


        }
        else {



            if (result[0].password === req.body.password) {


                res.json(result)
            }

            else {


                res.json(2)


            }
        }
    })

});


router.post('/forgotPassword', function (req, res) {


    var db = req.app.locals.db;

    db.collection('Users').updateOne(
        { email: req.body.email },
        { $set: { password: req.body.password } })

    res.json(req.body);



});


module.exports = router;
