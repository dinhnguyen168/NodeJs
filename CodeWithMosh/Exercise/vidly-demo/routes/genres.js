const { getGenres, 
        getGenreById, 
        postGenre,
        putGenreById, 
        deleteGenreById } = require('../controller/genreCtl');

const   authorize = require('../middleware/authorize'),
        checkAdmin = require('../middleware/admin');


const express = require('express');
const router = express.Router();

router.get('/', getGenres);

router.get('/:id', getGenreById);

router.post('/', authorize, postGenre);

router.put('/:id', putGenreById);       

router.delete('/:id', authorize, checkAdmin, deleteGenreById);

module.exports = router;