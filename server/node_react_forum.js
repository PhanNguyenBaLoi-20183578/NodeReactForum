const express = require("express");

const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");

const config = require('./config');
const bodyParser = require("body-parser");


mongoose.connect(config.mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=> console.log('connected mongodb'));


//connection.on('connected')

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "..","client/build")));

app.use('/api/auth',require("./controllers/Auth"));
app.use('/api/category',require("./controllers/Category"));
app.use('/api/forum',require("./controllers/Forum"));
app.use('/api/thread',require("./controllers/Thread"));
app.use('/api/post',require("./controllers/Post"));


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, "..","client/build/index.html"));
});

const PORT = 5005;
app.listen(PORT,()=> console.log('server running on port'+ PORT));

