const { Schema, model } = require('mongoose');

const albumSchema = new Schema ({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String
    },
    image: {
        type: String
    },
    genres: {
        type: Array
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

const Album = model('Album', albumSchema);

module.exports = Album;