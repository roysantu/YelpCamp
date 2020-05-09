var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var camps = [
    {name: "field name 1", image: "https://www.appletonmn.com/vertical/Sites/%7B4405B7C1-A469-4999-9BC5-EC3962355392%7D/uploads/campground_(2).jpg"},
    {name: "field name 2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6RvKOK5SA08FA8hrfobNVoTLxgqh3YfFCZzTkF2XuvhVE60_u&usqp=CAU"},
    {name: "field name 3", image: "https://secure.img1-fg.wfcdn.com/im/90243028/compr-r85/5433/54332849/mount-shuksan-and-its-reflection-in-picture-lake-north-cascades-national-park-washington-usa-photographic-print-on-canvas.jpg"}
];

app.get("/", function(req, res) {
    res.render("landingPage");
});

app.get("/campgrounds", function(req, res) {
    
    res.render("campgrounds", {camps: camps});
});

app.post("/campgrounds", function(req, res) {
    // get data from form
    var newCampName = req.body.newCampName;
    var newImageName = req.body.newImageName;
    // Add data to array
    camps.push({name: newCampName, image: newImageName});
    // redirect to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.listen(3000, process.env.IP, function() {
    console.log("YelpCamp server is started!!!");
});