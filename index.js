let bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
let mongoose = require('mongoose')
const mySecret = process.env['MONGO_URI']
mongoose.connect(mySecret , { useNewUrlParser: true, useUnifiedTopology: true });

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const UrlSchema = new mongoose.Schema({
  
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  }
})

let UrlData = mongoose.model("UrlData", UrlSchema);


app.post("/api/shorturl", (req, res) => {

  let string = (Math.random() + 1).toString(36).substring(7);
  let short = string
  console.log(short)

  
  
  UrlData.findOne({shortUrl: req.body.url}, function (err, data) {
    if (err) return console.log(err);
    

    if (!data) {

      if (/^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-\.@:%_\+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/g.test(req.body.url) == false) {

    res.json({ error: 'invalid url' })
  }

      console.log("nullNull")
const createNewRecord = (done) => {
  let newRecord = new UrlData({origUrl: req.body.url, shortUrl: short});
  
   newRecord.save(function(err, data) {
    if (err) return console.error(err);
     console.log("Document inserted succussfully! :" + data);
          res.json({
            original_url: data.origUrl,
            short_url: data.shortUrl
          });
    done(null, data)
  });


};
createNewRecord((err, data) => {
  if (err) return console.error(err);
  });
      
    }

 else { 
  res.json({
            original_url: data.origUrl,
            short_url: data.shortUrl
          });
}
    
  });




  
    
});

app.get("/api/shorturl/:shorturl", (req, res) => {

  UrlData.findOne({shortUrl: req.params.shorturl}, function (err, data) {
    if (err) return console.log(err);
    
    if (!data) {
      return res.json('No URL found')
  }
    else {
return res.redirect(data.origUrl)
    }
    })
})








  
  
   
  




app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
