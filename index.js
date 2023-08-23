const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const MongoStore = require("connect-mongo");
const { default: mongoose } = require("mongoose");

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);

// extract style and script in to layout section
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setup for view engines
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codieal",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://127.0.0.1:27017/insta_talk',
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
    }
  ));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Server is running on: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
