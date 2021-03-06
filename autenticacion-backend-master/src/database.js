const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION,
    {useUnifiedTopology: true,
    useNewUrlParser: true,    
    useCreateIndex: true,     
    useFindAndModify: false

});

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('Database is Connected!');
})