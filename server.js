const express = require( "express");
const cors = require( "cors" );
const uuid = require( "uuid");

var server = express( );
var port = 3000;

//Middleware
server.use( cors( ) );
server.use( express.json( ) );
server.use( express.urlencoded( {
    extended: false
} ) );

// Data
var data = require( "./data.js" );


//REST endpoints

//Get /posts
server.get( "/posts", function (req, res) {
    var response = {
        posts: data.posts
    };
    res.json( response );
});

//Post /posts
server.post( "/posts", function( req, res) {
    if ( req.body.title == undefined ) {
        //user did not send a title for their post
        var response = {
            msg: "Please enter a title name"
        };
    } else {
        //Add the new post to the list of posts
        var new_post = {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            date: req.body.date,
            image: req.body.image,
            text: req.body.text
        };
        data.posts.push( new_post )
        res.status( 201 );
        res.json( new_post );
    }
});

server.listen( port, function ( ) {
    console.log(`Listening on port ${port}`);
});