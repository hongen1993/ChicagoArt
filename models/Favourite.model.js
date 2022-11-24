const { Schema, model } = require("mongoose");

const favouriteSchema = new Schema(
    {
        title: String,
        imageUrl: String,
        userId: String,
        artworkId: String
    },
    {
        timestamps: true
    },
);

const FavouriteModel = model('Favourite', favouriteSchema);

module.exports = FavouriteModel;