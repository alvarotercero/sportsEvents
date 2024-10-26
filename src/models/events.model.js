const pool = require('../config/db');
const { dateValidation } = require('../utils/helpers');

const selectEvents = async () => {
    const [result] = await pool.query('select * from events');
    return result;
}

const selectEventById = async (id) => {
    const [result] = await pool.query(
        'select * from events where id = ?', 
        [id]
    );
    return result[0];
}

const insertEvent = async ({ nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador }) => {
    // Validar formato de fecha YYYY-MM-DD
    if (dateValidation(fecha) === -2) {
        return -2;
    }

    const [result] = await pool.query(
        'insert into events (nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador) values (?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador]
    );
    if (result.affectedRows != 1) {
        return -1;
    }
    return result.insertId;
}

const updateEventById = async (id, { nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador }) => {
    // Validar formato de fecha YYYY-MM-DD
    if (dateValidation(fecha) === -2) {
        return -2;
    }

    const [result] = await pool.query(
        'update events set nombre = ?, descripcion = ?, fecha = ?, ubicacion = ?, tipoDeporte = ?, organizador = ? where id = ?', 
        [nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador, id]
    );
    return result.affectedRows;
}

const deleteEventById = async (id) => {
    const [result] = await pool.query(
        'delete from events where id = ?', 
        [id]
    );
    return result.affectedRows;
}

module.exports = {
    selectEvents, selectEventById, insertEvent, updateEventById, deleteEventById
}