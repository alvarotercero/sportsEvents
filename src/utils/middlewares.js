const jwt = require('jsonwebtoken');
const { selectUserById } = require('../models/users.model');

exports.checkToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'Authorization Token must be provided.' });
    }
    const token = req.headers['authorization'];

    let data;
    try {
        // Verificamos que sea correcto
        data = jwt.verify(token, 'WelcomeToTheBestSportsEventsAPI');
    } catch (error) {
        return res.status(403).json({ message: 'Invalid Authorization Token' });
    }

    // Recuperamos el usuario del Token
    const user = await selectUserById(data.id);
    if (!user) {
        return res.status(403).json({ message: 'User not found' });
    }
    
    // Le añadimos el usuario a la petición
    req.user = user;
    next();
}