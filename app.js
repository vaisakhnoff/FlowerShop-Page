const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./config/db');
const session = require('express-session');
dotenv.config();
const app = express();

const user = require('./routes/userRoute');
const admin = require('./routes/adminRoute');

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/user'),
    path.join(__dirname, 'views/admin')
]);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

db();

app.use('/', user);
app.use('/admin', admin);

app.use((req, res, next) => {
    res.status(404).render('page-404', { error: 'Page not found' });
});

app.listen(process.env.PORT, () => {
    console.log("server running 3500");
});

