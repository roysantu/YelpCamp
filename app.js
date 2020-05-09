var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
mongoose.set('useUnifiedTopology', true);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String 
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res) {
    res.render("landingPage");
});

app.get("/campgrounds", function(req, res) {
    
    // res.render("campgrounds", {camps: camps});
    // Get Campgrounds from db
    Campground.find({}, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {camps: campground});
        };
    })
});

app.post("/campgrounds", function(req, res) {
    // get data from form
    var newCampName = req.body.newCampName;
    var newImageName = req.body.newImageName;
    var newCampDesc = req.body.newCampDesc;
    var newCampObj = {
        name: newCampName,
        image: newImageName,
        description: newCampDesc
    };
    // Add Data to DB
    Campground.create(newCampObj, function(err, campground) {
       if(err) {
           console.log("Error to add data: " + err);
       } else {
           console.log("New Camp Added")
        //    console.log(campground);
       }
    });
    // Add data to array
    // camps.push({name: newCampName, image: newImageName});
    // redirect to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.get("/campgrounds/:id", function(req, res) {
    // get details of one campground
    Campground.findById(req.params.id, function(err, foundCamp) {
        if(err) {
            console.log("No Camp Found");
            console.log(err);
        } else {
            res.render("show", {foundCamp: foundCamp});
        }
    })
    
});

app.listen(3000, process.env.IP, function() {
    console.log("YelpCamp server is started!!!");
});