const pool = require('../config/db');

const selectUserById = async (id) => {
    const [result] = await pool.query(
        'select * from users where id = ?', 
        [id]
    );
    if (result.length === 0) {
        return null;
    }
    return result[0];
}

const selectUserByUsername = async (username) => {
    const [result] = await pool.query(
        'select * from users where username = ?',
        [username]
    );
    if (result.length === 0) {
        return null;
    }
    return result[0];
} 

const insertUser = async ({ username, password }) => {
    const [result] = await pool.query(
        'insert into users (username, password) values (?, ?)',
        [username, password]
    );
    return result.insertId;
}

module.exports = {
    selectUserById, selectUserByUsername, insertUser
}