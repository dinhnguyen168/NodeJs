const debug   = require('debug')('app:startup');

const morgan  = require('morgan'),
      helmet  = require('helmet'),
      _       = require('underscore');

const Joi     = require('joi');

const logger  = require('./middleware/logger');

const home    = require('./routes/home'),
      courses = require('./routes/courses');

const express = require('express');

const app     = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default  

app.use(express.json()); 
app.use(helmet());
app.use(logger);
app.use('/api/courses', courses);
app.use('/', home)

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enable...') // console.log()
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listen on port ${port}...`));

