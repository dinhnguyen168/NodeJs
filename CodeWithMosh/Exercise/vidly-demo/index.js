require('express-async-errors');

const   mongoose = require('mongoose'),
        config = require('config'),
        winston = require('winston');

require('winston-mongodb');

const   home = require('./routes/home'),
        genres = require('./routes/genres'),
        customers = require('./routes/customers'),
        movies = require('./routes/movies'),
        rentals = require('./routes/rentals');
        users = require('./routes/users'),
        auth = require('./routes/auth');

const   error = require('./middleware/error');

const   express = require('express');
const { format } = require('winston');
const   app = express();

winston.exceptions.handle(
    new winston.transports.File({filename : 'uncaughtException.log'})
);

process.on('unhandledRejection', ex => {
    throw ex;
});

winston.add(new winston.transports.File({filename : 'logfile.log'})); 
winston.add(new winston.transports.MongoDB({db : 'mongodb://localhost/vidly', level: 'error'})); 

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);    
}

mongoose.connect('mongodb://localhost/vidly', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected.'))
    .catch(err => console.error('Something went wrong to connect MongoDB...'));

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/rentals', rentals);
app.use('/api/movies', movies);
app.use('/api/customers', customers);
app.use('/api/genres', genres); 
app.use('/', home);
app.use(error);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));