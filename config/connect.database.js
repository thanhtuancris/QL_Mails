const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/ql_mail?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to mongo');
    }catch(e){
        console.log('failed to connect');
    }
}
module.exports = {connect}
