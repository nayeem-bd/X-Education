const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../model/userModel');

// eslint-disable-next-line arrow-body-style
const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure
    }
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: {
            user
        }
    });
};

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        createSendToken(newUser, 201, req, res);
    } catch (err) {
        return next(new Error(err));
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Provide username and password'
        });
    }

    const user = await User.findOne({ username }).select('+password');
    if (!user || !await user.correctPassword(password, user.password)) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid username or password'
        });
    }

    createSendToken(user, 200, req, res);

};

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

exports.protect = async (req, res, next) => {
    let token;
    if (req.cookies.jwt) token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({status:'error',message:'Your are not logged in. Please log in first'});
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({status:'error',message:'The user does not exits'});
    }
    req.user = currentUser;
    next();
};

// exports.isLoggedIn = async (req, res, next) => {
//     if (req.cookies.jwt) {
//         try {
//             // verify token
//             const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

//             //check if user still exits
//             const currentUser = await User.findById(decoded.id);
//             if (!currentUser) {
//                 return next();
//             }
//             return next();
//         } catch (err) {
//             return next();
//         }
//     }
//     next();
// };


exports.restrictTo = (role) => {
    return (req, res, next) => {
        if (req.user.username != role) {
            return res.status(403).json({
                status: 'error',
                message: 'You do not have permission'
            });
        }
        next();
    };
};