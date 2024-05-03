const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
    {
        fullName: { type: String, required: true },
        title: { type: String, required: true },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
