const {Genre, validate} = require('../models/genre');
const asyncMiddleware = require('../middleware/async')


exports.getGenres = async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
}

exports.getGenreById = asyncMiddleware(async (req,res) => {
    const genre = await Genre
        .findById(req.params.id);
    res.send(genre);
});

exports.postGenre = async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre({name : req.body.name});
    genre = await genre.save(); 
    res.send(genre);
}

exports.putGenreById = async (req,res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message); 

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name : req.body.name}, {new : true})

    if (!genre) return res.status(404).send('This genre with given id is not found!');

    res.send(genre);
}

exports.deleteGenreById = async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with given id is not found to delete!');

    res.send(genre);
}
