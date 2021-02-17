const {postUserToRegister} = require('../controller/userCtl');

const   express = require('express');
const   router = express.Router();

router.post('/', postUserToRegister);

module.exports = router;