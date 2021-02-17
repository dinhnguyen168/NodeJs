const   mongoose = require('mongoose');

const   home = require('./routes/home'),
        genres = require('./routes/genres'),
        customers = require('./routes/customers'),
        movies = require('./routes/movies'),
        rentals = require('./routes/rentals');
        users = require('./routes/users'),
        auth = require('./routes/auth');

const   express = require('express');
const   app = express();

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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));