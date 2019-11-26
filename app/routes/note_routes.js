var ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
    app.get('/notes', (req,res) => {
        db.collection('notes').find({}).toArray((err, results) => {
            if(err) {
                res.send({ 'error': 'An error has occured!'});
            } else {
                console.log(results)
                res.send(results);
            }
         })

    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectId(id)};
        const note = { text: req.body.body, title: req.body.title };


        db.collection('notes').update(details, note, (err, item) => {
            if(err) {
                res.send({ 'error': 'An error has occured!'});
            } else {
                res.send(item);
            }
         })

    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectId(id)};

        db.collection('notes').deleteOne(details, (err, item) => {
            if(err) {
                res.send({ 'error': 'An error has occured!'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
         })

    });

    app.post('/notes', (req, res ) => {
        console.log(req.body);
        const message = {
            message: req.body.message,
            date: req.body.date
        };
        db.collection('notes').insertOne(message, (err, result) => {
            if(err) {
                res.send({ 'error': 'An error has occured!'});
            } else {
                console.log(result.ops[0]);
                res.send(result.ops[0]);
            }
         })
    });
};