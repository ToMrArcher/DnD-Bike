//Requires
var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var XLSX = require("xlsx");
var multer = require("multer");
var csv = require("csvtojson");

//App setup
mongoose.connect("mongodb://localhost/dndBike");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
var upload = multer(  {dest: "uploads/"});


var tableSchema = new mongoose.Schema({
    title: String,
    headers: [String],
    cols: [{
        lowDice: Number,
        highDice: Number,
        rows: [String] 
    }]
});

var Table = mongoose.model("Table", tableSchema);

/* Table.create({
    title: "Some Thing",
    headers: [
        "d20", 
        "Wtf",
        "isthis"
    ],
    cols: [
        {
            lowDice: 0,
            highDice: 4,
            rows: ["Hello", "coolthing"]
        },
        {
            lowDice: 5,
            highDice: 10,
            rows: ["hello2", "thisiscool2"]
        }
    ]
}) */

//ROUTING!

//Home Page Route
app.get("/", function(req, res){
    res.render("index");
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


// app.get("/tables/new", function(req, res){
//     res.render("newtable")
// });


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

//I AM LISTENING GUYS!
app.listen(3000, function(){
    console.log("Server is running");
});


//mongod --dbpath /System/Volumes/Data/data/db 