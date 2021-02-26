//-- Build an api with http://vidly.com/api/genres

const express = require('express');
const _ = require('underscore');
const Joi = require('joi');

const app = express();

app.use(express.json());

const genres = [
    {id: 1, name: "Musical"},
    {id: 2, name: "Erotik Film"},
    {id: 3, name: "Thriller"},
    {id: 4, name: "Drama"},
];

app.get('/', (req, res) => {
    res.send(`<h1>Hello World!!!</h1>`);
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req,res) => {
    const genre = _.find(genres, g => g.id === parseInt(req.params.id));
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const {error} = validateGenres(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = {
        id: genres.length + 1,
        name : req.body.name,
    }

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req,res) => {
    // Find the genre 
    const genre = _.find(genres, g => g.id === parseInt (req.params.id))
    // If not exists then return 404
    if (!genre) return res.status(404).send('This genre is not found');
    //Validate input
    const {error} = validateGenres(req.body)
    // If not valid then return 400 - Bad Request
    if (error) return res.status(400).send(error.details[0].message); 

    //Modify data
    genre.name = req.body.name;
    //Send genre to client
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    // Look at the genre 
    const genre = _.find(genres, g => g.id === parseInt(req.params.id));
    // If not exists return 404 to client
    if (!genre) return res.status(404).send('The genre with given is not found!');

    //Find index the genre
    const index = _.findIndex(genres, genre)

    //Delete
    genres.splice(index, 1);

    //Send the same genre to client
    res.send(genre);

});

function validateGenres(genre){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(genre);  
};


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));