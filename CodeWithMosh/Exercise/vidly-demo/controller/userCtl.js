const   _ = require('lodash'),
        bcrypt = require('bcrypt');

const   {User, validate} = require('../models/user');

exports.postUserToRegister = async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered!');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    //hashing Passwort to save it in db
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(req.body.password, salt);

    await user.save()   
    res.send(_.pick(user, ['_id', 'name', 'email']));
}