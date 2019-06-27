const express = require( "express");
const cors = require( "cors" );
const uuid = require( "uuid");
const mongoose = require("mongoose");

var server = express( );
var port = process.env.PORT || 3000;

//Middleware
server.use( cors( ) );
server.use( express.json( ) );
server.use( express.urlencoded( {
    extended: false
} ) );

// Data
var postsModel = require("./schema.js")


//REST endpoints

//Get /posts
server.get( "/posts", function (req, res) {
    postsModel.find().then(function(posts){
        var reversed_list = [];
        posts.forEach(function(post) {
            reversed_list.unshift(post);
        });
        var response = {
            posts: reversed_list
        };
        res.json( response);
    }).catch(function(error) {
        var response = {
                msg: error.message
        };
            res.status( 400 );
            res.json( response );
    });
    // var response = {
    //     posts: data.posts
    // };
    // res.json( response );
});

//Post /posts
server.post( "/posts", function( req, res) {
    // if ( req.body.title == undefined ) {
    //     //user did not send a title for their post
    //     var response = {
    //         msg: "Please enter a title name"
    //     };
    // } else {
        //Add the new post to the list of posts
        postsModel.create({
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            // skip the date field
            image: req.body.image,
            text: req.body.text

        }).then(function(new_post) {
            res.status(201);
            res.json(new_post);
        }).catch(function(error) {
            var response = {
                msg: error.message
            };
            res.status( 400 );
            res.json( response );
            //if anything went wrong above, we will catch the error
        });
    //     var new_post = {
    //         title: req.body.title,
    //         author: req.body.author,
    //         category: req.body.category,
    //         date: req.body.date,
    //         image: req.body.image,
    //         text: req.body.text
    //     };
    //     data.posts.push( new_post )
    //     res.status( 201 );
    //     res.json( new_post );
    // }
});



mongoose.connect("mongodb+srv://exoticdolphin:coral69@mydatabase-thqf4.mongodb.net/test?retryWrites=true&w=majority", {
    // test will specify which database it will connect to within the database
    useNewUrlParser: true
}).then(function() {
    server.listen( port, function ( ) {
        console.log(`Listening on port ${port}`);
    });
});
