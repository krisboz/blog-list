const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, "title required"] },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: String,
  likes: Number,
  user: String,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
