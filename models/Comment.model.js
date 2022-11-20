const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        description: String,
        users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
        //UserImg: String,
    },
    {
        timestamps: true
    }
);

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;