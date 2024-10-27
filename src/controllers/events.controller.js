const { formatDateToLocalTime } = require('../utils/helpers');
const { selectEvents, selectEventById, selectEventsUpcoming, selectEventsByType, selectEventsByDate, insertEvent, updateEventById, deleteEventById } = require("../models/events.model");

const getEvents = async (req, res, next) => {
    try {
        // Comprobamos si la petición contiene type
        const { type } = req.query;
        if (!type) {
            const result = await selectEvents();
            // Ajustamos las fechas a hora local
            const adjustedResults = formatDateToLocalTime(result);
            return res.json(adjustedResults);
        }
        // Si la petición contiene type, ejecutamos selectEventsByType()
        const result = await selectEventsByType(type);
        // Ajustamos las fechas a hora local
        const adjustedResults = formatDateToLocalTime(result);
        res.json(adjustedResults);
    } catch (error) {
        next(error);
    }
}

const getEventById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await selectEventById(id);
        // Ajustamos las fechas a hora local
        const adjustedResults = formatDateToLocalTime(result);
        res.json(adjustedResults[0]);
    } catch (error) {
        next(error);
    }
}

const getEventsUpcoming = async (req, res, next) => {
    try {
        const result = await selectEventsUpcoming();
        // Ajustamos las fechas a hora local
        const adjustedResults = formatDateToLocalTime(result);
        res.json(adjustedResults);
    } catch (error) {
        next(error);
    }
}

const getEventsByDate = async (req, res, next) => {
    try {
        const { from, to } = req.query;
        const result = await selectEventsByDate(from, to);
        // Ajustamos las fechas a hora local
        const adjustedResults = formatDateToLocalTime(result);
        res.json(adjustedResults);
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
        const affectedRows = await updateEventById(id, req.body);
        // Error si la fecha es incorrecta
        if (affectedRows === -2) {
            return res.status(400).json({ error: 'Invalid date format or values. Expected format is YYYY-MM-DD.' });
        }
        // Error si la modificación ha fallado
        if (affectedRows !== 1) {
            return res.status(400).json({ error: 'Invalid request: The data provided is incorrect or incomplete.' });
        }
        // Obtenemos el evento autualizado para añadirlo a la respuesta
        const newEvent = await selectEventById(id);
        res.status(200).json(newEvent);
    } catch (error) {
        next(error);
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedEvent = await selectEventById(id);
        const affectedRows = await deleteEventById(id);
        if (affectedRows !== 1) {
            return res.status(404).json({ error: 'Invalid request: The specified Event ID does not exist' });
        }
        res.status(200).json(deletedEvent);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getEvents, getEventById, getEventsUpcoming, getEventsByDate, postEvent, putEvent, deleteEvent
}