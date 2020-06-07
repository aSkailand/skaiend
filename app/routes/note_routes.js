var ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

module.exports = function (app, db) {
    app.post('/register', async (req, res) => {
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            email: req.body.email,
            password: hashedPassword
        };
        
        if (await db.collection('users').find({email: user.email}).count() > 0){
            res.send({
                'error': 'an user with this id already exist'
            });
        } else {
            db.collection('users').insertOne(user, (err, result) => {
                if (err) {
                    res.send({
                        'error': 'An error has occured!'
                    });
                } else {
                    res.redirect('/');
                }
            });
        }
        
        
    });

    app.get('/players', (req, res) => {
        db.collection('players').find({}).toArray((err, results) => {
            if (err) {
                res.send({
                    'error': 'An error has occured getting players'
                });
            } else {
                console.log(results);
                res.send(results);
            }
        })
    });

    app.get('/notes', (req, res) => {
        db.collection('notes').find({}).toArray((err, results) => {
            if (err) {
                res.send({
                    'error': 'An error has occured!'
                });
            } else {
                console.log(results);
                res.send(results);
            }
        })

    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectId(id)
        };
        const note = {
            text: req.body.body,
            title: req.body.title
        };


        db.collection('notes').update(details, note, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured!'
                });
            } else {
                res.send(item);
            }
        })

    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectId(id)
        };

        db.collection('notes').deleteOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured!'
                });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        })

    });

    app.post('/notes', (req, res) => {
        console.log(req.body);
        const message = {
            message: req.body.message,
            date: req.body.date
        };
        if (message.message) {
            db.collection('notes').insertOne(message, (err, result) => {
                if (err) {
                    res.send({
                        'error': 'An error has occured!'
                    });
                } else {
                    res.send(result.ops[0]);
                }
            })
        }
    });

    app.post('/players', (req, res) => {
        const player = {
            name: req.body.name,
            number: req.body.number,
            position: req.body.position,
            team: req.body.team
        };

        if (player.name) {
            db.collection('players').insertOne(player, (err, result) => {
                if (err) {
                    res.send({
                        'error': 'an error occured adding a new player'
                    });
                } else {
                    res.send(result.ops[0]);
                    console.log(result.ops[0]);
                    console.log('wii');
                }
            })
        } else {
            res.send('fuck off');
        }
    });
};