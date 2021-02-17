const { getGenres, 
        getGenreById, 
        postGenre,
        putGenreById, 
        deleteGenreById} = require('../controller/genreCtl');

const express = require('express');
const router = express.Router();

router.get('/', getGenres);

router.get('/:id', getGenreById);

router.post('/', postGenre);

router.put('/:id', putGenreById);

router.delete('/:id', deleteGenreById);

module.exports = router;