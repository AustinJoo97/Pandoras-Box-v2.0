const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(
        process.env.MONGODB_URI || 'mongodb://localhost/pandoras-box-v2',
            {
                userNewUrlParser : true,
                useUnifiedTopology : true,
                useCreateIndex : true,
                useFindAndModify: false
            }
        )
        console.log('successfully connected to db')
    } catch(err) {
        console.log('error connecting to db');
        console.log(err);
        process.exit(1)
    }
}   

module.exports = connection;