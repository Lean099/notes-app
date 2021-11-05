const express = require('express');
const cors = require('cors');
const { Store } = require('express-session');
const session = require('express-session');
const passport = require('passport');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(cors());

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/*app.use(session({
    secret: 'misecreto',
    cookie: {
        httpOnly: true,
        expires: expiryDate
    },
    resave: true,
    saveUninitialized: true,
}))*/
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/user", require("./routes/user"));
app.use("/api/note", require("./routes/note"));

module.exports = app;