const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride = require('method-override');

const users = require('./routes/api/users');
const project = require('./routes/api/project');

const app = express();

//Body parser middleware

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//something to do with file upload, might change later
app.use(methodOverride('_method'));

//DB config

const db = require('./config/keys').mongoURI;

//connect db

mongoose
  .connect(db)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

//passport config

require('./config/passport')(passport);

//use routes
app.use('/api/users',users);
app.use('/api/project',project);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
