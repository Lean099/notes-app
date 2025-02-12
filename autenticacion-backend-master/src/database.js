const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION,
    {});

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('Database is Connected!');
})