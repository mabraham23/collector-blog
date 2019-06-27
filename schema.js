const uuid = require( "uuid" );
const mongoose = require( "mongoose");
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true, 
        default: "all",
    },
    date: {
        type: String,
        required: true,
        default: new Date( ).toDateString( )
    },
    image: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: false,
    }
});

var model = mongoose.model("posts", postSchema);

module.exports = model; //posts will be the name of the collection within the database


