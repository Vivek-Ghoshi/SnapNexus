const mongoose = require('mongoose');
const MongoUri = "mongodb+srv://InstagramClone:InstagramClone@instagramclone.sozlj.mongodb.net/InstagramClone"
mongoose.connect(MongoUri)
.then(function(){
   console.log("connected to mongoose")
})
.catch(function(err){
    console.log(err.message)
});

const db = mongoose.connection;

module.exports = db;
