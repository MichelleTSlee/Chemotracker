var express = require("express"),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require("body-parser"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  Treatment = require("./models/treatment"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seeds");

//Requiring Routes
  var commentRoutes = require("./routes/comments"),
      treatmentsRoutes = require("./routes/treatments"),
      indexRoutes = require("./routes/index");


var url = process.env.DATABASEURL || "mongodb://localhost/chemo"
mongoose.connect(url);

var port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Seed the Database
seedDB();

//======================
//PASSPORT CONFIGURATION
//======================
app.use(require("express-session")({
  secret: "Pancakes are the best!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/treatments", treatmentsRoutes);
app.use("/treatments/:id/comments", commentRoutes);



// //======================
// //SERVER CONFIGURATION
// //======================
app.listen(port, function () {
    console.log("ChemoTracker listening!!!");
});
