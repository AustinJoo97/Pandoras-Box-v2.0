const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 520
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    albumCommented: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }
})

const Comment = model('Comment', commentSchema);

module.exports = Comment;