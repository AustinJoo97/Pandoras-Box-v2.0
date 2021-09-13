const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/pandoras-box-v2',
    {
        userNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true,
        useFindAndModify: false
    }
)

module.exports = mongoose.connection;