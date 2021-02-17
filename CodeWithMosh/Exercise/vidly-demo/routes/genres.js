const { getGenres, 
        getGenreById, 
        postGenre,
        putGenreById, 
        deleteGenreById} = require('../controller/genreCtl');

const authorize = require('../middleware/authorize');

const express = require('express');
const router = express.Router();

router.get('/', getGenres);

router.get('/:id', getGenreById);

router.post('/', authorize, postGenre);

router.put('/:id', putGenreById);

router.delete('/:id', deleteGenreById);

module.exports = router;