const express = require('express');
const router = express.Router();
const session = require('express-session');

router.use(session({
    secret: 'shhhhhhhh', // sign session ID cookie
    resave: false,
    saveUninitialized: true
}))

function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        res.send('Please sign in');
    } else {
        next();
    }
}

function checkRole(access) {
    return (req, res, next) => {
        if (req.session.user_access < access) {
            res.send('Permission denied');
        } else {
            next();
        }
    }
}

module.exports = {
    checkAuth,
    checkRole
};