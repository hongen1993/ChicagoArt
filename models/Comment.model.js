const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        description: String,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        artworkId: String
    },
    {
        timestamps: true
    }
);

const CommentModel = model('Comment', commentSchema);

module.exports = CommentModel;