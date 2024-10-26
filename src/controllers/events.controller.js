const { selectEvents, selectEventById, insertEvent, updateEventById } = require("../models/events.model")

const getEvents = async (req, res, next) => {
    try {
        const result = await selectEvents();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getEventById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await selectEventById(id);
        res.json(event);
    } catch (error) {
        next(error);
    }
}

const postEvent = async (req, res, next) => {
    try {
        const newId = await insertEvent(req.body);
        // Error si la fecha es incorrecta
        if (newId === -2) {
            return res.status(400).json({ error: 'Invalid date format or values. Expected format is YYYY-MM-DD.' });
        }
        // Error si la inserción ha fallado
        if (newId === -1) {
            return res.status(400).json({ error: 'Invalid request: The data provided is incorrect or incomplete.' });
        }
        // Obtenemos el evento creado para añadirlo a la respuesta
        const newEvent = await selectEventById(newId);
        res.status(201).json(newEvent);
    } catch (error) {
        next(error);
    }
}

const putEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateEventById(id, req.body);
        // Error si la fecha es incorrecta
        if (result === -2) {
            return res.status(400).json({ error: 'Invalid date format or values. Expected format is YYYY-MM-DD.' });
        }
        // Error si la modificación ha fallado
        if (result !== 1) {
            return res.status(400).json({ error: 'Invalid request: The data provided is incorrect or incomplete.' });
        }
        // Obtenemos el evento autualizado para añadirlo a la respuesta
        const newEvent = await selectEventById(id);
        res.status(200).json(newEvent);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getEvents, getEventById, postEvent, putEvent
}