const bcrypt = require('bcrypt');

const { selectUserById, insertUser, selectUserByUsername } = require("../models/users.model");
const { createToken } = require('../utils/helpers');

const getUserProfile = async (req, res, next) => {
    try {
        const user = req.user;
        res.json(user);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    try {
        // Encriptamos la contraseña antes de enviarla
        req.body.password = await bcrypt.hash(req.body.password, 10); 
        const insertedId = await insertUser(req.body);
        if (!insertedId) {
            return res.status(400).json({ message: 'Failed to create new user' });
        }
        const newUser = await selectUserById(insertedId);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await selectUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const samePassword = await bcrypt.compare(password, user.password);
        if (!samePassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.json({
            message: 'Welcome to SportsEvents API!', 
            token: createToken(user)
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUserProfile, createUser, loginUser
}