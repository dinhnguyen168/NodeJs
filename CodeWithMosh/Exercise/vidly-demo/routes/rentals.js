const { getRentals, 
        postRental, 
        getRentalById} = require('../controller/rentalCtl');

const   express = require('express');
const   router = express.Router();

router.get('/', getRentals);

router.post('/', postRental);

router.get('/:id', getRentalById);

module.exports = router; 