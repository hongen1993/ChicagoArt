const { Schema, model } = require("mongoose");

const favouriteSchema = new Schema(
    {
        imageUrl: String,
        title: String,
        autor: String,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        artworkId: String
    },
    {
        timestamps: true
    },
);

const FavouriteModel = model('Favourite', favouriteSchema);

module.exports = FavouriteModel;