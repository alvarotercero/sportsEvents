const jwt = require('jsonwebtoken');
const { selectUserById } = require('../models/users.model');

exports.checkToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({ message: 'Authorization Token must be provided' });
    }
    const token = req.headers['authorization'];

    let data;
    try {
        // Verificamos que sea correcto
        data = jwt.verify(token, 'WelcomeToTheBestSportsEventsAPI');
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Authorization Token' });
    }

    // Recuperamos el usuario del Token
    const user = await selectUserById(data.id);
    if (!user) {
        return res.status(401).json({ message: 'Invalid Username' });
    }

    // Le añadimos el usuario a la petición
    req.user = user;
    next();
}

exports.checkUserAllowed = (req, res, next) => {
    const { id } = req.user;
    // Solo autorizamos a los ids 1, 2 y 5
    if (id !== 1 && id !== 2 && id !== 5) {
        return res.status(403).json({ message: 'Forbidden: Access is denied' });
    }
    next();
}