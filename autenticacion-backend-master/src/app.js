require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 80);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/user"));
app.use("/api/note", require("./routes/note"));

module.exports = app;