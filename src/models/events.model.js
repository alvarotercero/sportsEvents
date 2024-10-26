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
    return result[0];
}

const insertEvent = async ({ nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador }) => {
    
    // Validar formato de fecha YYYY-MM-DD
    const date = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!date.test(fecha)) {
        return -2;
    }

    const [result] = await pool.query(
        'insert into events (nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador) values (?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador]
    );
    if (result.affectedRows !== 1) {
        return -1;
    }
    return result.insertId;
}

module.exports = {
    selectEvents, selectEventById, insertEvent
}