var express = require("express"),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  Treatment = require("./models/treatment"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seeds");

//Requiring Routes
  var commentRoutes = require("./routes/comments"),
      treatmentsRoutes = require("./routes/treatments"),
      indexRoutes = require("./routes/index");


mongoose.connect("mongodb://localhost/chemo");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
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
  next();
});

app.use("/", indexRoutes);
app.use("/treatments", treatmentsRoutes);
app.use("/treatments/:id/comments", commentRoutes);


app.listen(3000, function(){
  console.log("ChemoTracker Server is listening!!!")
});
