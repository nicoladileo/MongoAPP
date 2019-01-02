const config = require('config');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const router = express.Router();
const {User,validateUser,validateUserLogin} = require('../models/users');


router.post('/register', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let userFinded = await User.findOne({email: req.body.email});
    if (userFinded)
        return res.status(422).send('A user with this email already exists');
    let user = new User(_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();
    res.send(_.pick(user,['name','email']));
});

router.post('/login', async (req, res) => {
    const {error} = validateUserLogin(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let userFinded = await User.findOne({email: req.body.email});
    if (!userFinded)
        return res.status(404).send('Invalid email');
    let validPassword = await bcrypt.compare(req.body.password, userFinded.password);
    if (!validPassword)
        return res.status(401).send('Invalid password');
    let token = jwt.sign({user:userFinded._id},config.get('jwtkey'), {expiresIn: '30m'});
    res.json({
        user: _.pick(userFinded,['name','email']),
        token
    });
});

module.exports = router;