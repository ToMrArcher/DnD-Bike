//Requires
////////// REQUIRES //////////
var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var fs = require("fs");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");


////////// APP SETUP ////////////
mongoose.connect("mongodb://localhost/dndBike");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


////////// SCHEMA FOR THE TABLES /////////////
var tableSchema = new mongoose.Schema({
    title: String,
    headers: [String],
    cols: [{
        lowDice: Number,
        highDice: Number,
        rows: [String] 
    }]
});


/////////TABLE MODEL////////////
var Table = mongoose.model("Table", tableSchema);


/////////BLOG SCHEMA////////////
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

///////////BLOG MODEL/////////////
var Blog = mongoose.model("Blog", blogSchema);


//ROUTING!

//Home Page Route
app.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {blogs: blogs});
        }
    });
});

app.get("/tables", function(req, res){
    Table.find({}, function(err, tables){
        if(err){
            console.log(err);
            res.redirect("/");
        }
        else{
            res.render("tables", {tables: tables});
        }
    });
});


app.get("/tables/new", function(req, res){
    let rawdata = fs.readFileSync('tables.json');
    let table = JSON.parse(rawdata); 

    Table.create(table, function(err, newBlog){
        if(err){
            console.log(err);
        }
        else{
            console.log(newBlog);
        }
    });

    res.redirect("/tables")
});


app.get("/blogs/new", function(req, res){
    res.render("newBlog");
});

app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("showBlog", {blog: foundBlog});
        }
    });
});


app.get("/tables/:id", function(req, res){
    Table.findById(req.params.id, function(err, foundTable){
        if(err){
            res.redirect("/tables");
        }
        else{
            res.render("show", {table: foundTable});
        }
    });
});


app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("blogs", {blogs: blogs});
        }
    });
});


app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("newBlog");
        }
        else{
            res.redirect("/blogs")
        }
    });
});


app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
        }
        else{
            res.render("editBlog", {blog: foundBlog});
        }
    });
});


app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("index");
        }
        else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs");
        }
    });
});


//I AM LISTENING GUYS!
app.listen(3000, function(){
    console.log("Server is running");
});






//////////////DUMPING GROUND! EVERYTHIGN WEIRD GOES HERE ////////////////////

//Below creates a blog in case I need to force create a blog.

// Blog.create({
//     title: "Test Dog!",
//     image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=678&q=80",
//     body: "Hello this is a blog post! This is kind of cool but hey why not "
// });



// Below was a post for table. I am currently not using a new table form, as it was very difficult to parse and get right.
// The below code will get the uplaoded csv file from a /tables/new and parse it into json. It will then console.log the json object.

// app.post("/tables", upload.single("csvfile"), function(req, res, next){
//     csv()
//     .fromFile(req.file.path)
//     .then((jsonObj)=>{
//         console.log(jsonObj);
//         console.log(jsonObj.length);
//         console.log(jsonObj[0][0]);
//     });
//     res.redirect("/tables");
// });


//IMPORTANT! THE BELOW SHELL COMMAND START MONGOD DATABASE, AS NEW MACOS IS STUPID AND GOT RID OF MY OLD PATH :(

//mongod --dbpath /System/Volumes/Data/data/db 
