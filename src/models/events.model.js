const pool = require('../config/db');

const selectEvents = async () => {
    const [result] = await pool.query('select * from events');
    return result;
}

const selectEventById = async (id) => {
    const [result] = await pool.query(
        'select * from events where id = ?', 
        [id]
    );
    return result;
}

const selectEventsUpcoming = async () => {
    // Obtenemos todos los eventos posteriores a la fecha actual
    // y limitamos la respuesta a los 10 primeros
    const [result] = await pool.query(
        'select * from events where fecha >= current_date() order by fecha asc limit 10'
    );
    return result;
}

const selectEventsByType = async (type) => {
    const [result] = await pool.query(
        'select * from events where tipoDeporte = ?',
        [type]
    );
    return result;
}

const selectEventsByDate = async (firstDate, lastDate) => {
    const [result] = await pool.query(
        'select * from events where fecha between ? and ? order by fecha asc', 
        [firstDate, lastDate]
    );
    return result;
}

const insertEvent = async ({ nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador }) => {
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
    selectEvents, selectEventById, selectEventsUpcoming, selectEventsByType, selectEventsByDate, insertEvent, updateEventById, deleteEventById
}