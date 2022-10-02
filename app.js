const express = require('express');
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const modal = require('./models/user');
const user = require('./models/user');
const routes = require("./routes/main")

const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(routes)

mongoose.connect('mongodb://localhost:27017/userdb')


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})