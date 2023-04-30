const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient



var db, collection;

const url = "mongodb+srv://malikcgdev:needascore@score.cbb6hez.mongodb.net/?retryWrites=true&w=majority";
const dbName = "tictactoe";

app.listen(0909, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('results').find().toArray((err, result) => {
    if (err) return console.log(err)
    const x = result.filter(element=>element.winner === 'x').length // filter will return a new array that will match what i am looking for
    const o = result.filter(element=>element.winner === 'o').length
    res.render('index.ejs', {xResult: x, oResult: o})
  })
})

app.post('/score', (req, res) => {
  db.collection('results').insert({winner:req.body.winner }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// app.put('/score/:result', (req, res) => {
//   var result = req.params.result;
//   db.collection('results').findOneAndUpdate(
//     { _id: ObjectId(id) }, // Example query based on the document ID
//     { $set: { xResult: 0, oResult: 0 } }, // Set the xResult or oResult field to 0
//     { sort: { _id: -1 }, upsert: true },
//     (err, result) => {
//       if (err) return res.send(err);
//       res.send(result);
//     }
//   );
// });


// app.put('/score/:Result', (req, res) => {
//   var result = req.params.result; // Get the captured parameter from the URL
//   if (result === 'xResult')
//     db.collection('score')
//     .findAndUpdate({xResult: 0}, {oResult: 0}, {
//       $set: {
        
//       }

//   }else if (result === 'oResult') {
//     // Handle PUT request to /score/oResult
//     db.collection('score')
//     .findAndUpdate({xResult: 0}, {oResult: 0}, {
//       $set: {
        
//       }
//   } else {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.delete('/score', (req, res) => {
  db.collection('score').findOneAndDelete({xResult: 0}, {oResult: 0}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Score deleted!')
  })
})
