const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const db = require('./config/mongoose-connection');
const cookieParser = require('cookie-parser'); 



app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const indexRouter = require('./routes/index-router')

app.use("/",indexRouter);



app.listen(3000);
