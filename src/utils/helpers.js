const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const jwt = require('jsonwebtoken');

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Validates a date string to ensure it matches the pattern "YYYY-MM-DD".
 * Only allows years between 1900 and 2099, months between 01 and 12, 
 * and days between 01 and 31.
 * 
 * @param {string} date - The date string to validate, expected in "YYYY-MM-DD" format.
 * @returns {number} Returns:
 * - 1 if the date matches the "YYYY-MM-DD" pattern.
 * - -2 if the date does not match the pattern.
 * 
 * * @example
 *   dateValidation("2024-10-25"); // Returns 1
 *   dateValidation("2099-12-31"); // Returns 1
 *   dateValidation("2100-01-01"); // Returns -2 (year out of range)
 *   dateValidation("2024-13-10"); // Returns -2 (invalid month)
 *   dateValidation("2024-10-32"); // Returns -2 (invalid day)
 */
const dateValidation = (date) => {
    const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!dateRegex.test(date)) {
        return -1;
    }
    return 1;
}

const formatDateToLocalTime = (result) => {
    // Obtenemos la zona horaria local
    const localTimeZone = dayjs.tz.guess();
    // Devolvemos la hora en zona horaria local
    const adjustedResults = result.map(event => ({
        ...event,
        fecha: dayjs.utc(event.fecha).tz(localTimeZone).format('YYYY-MM-DD')
    }));
    return adjustedResults;
}

const createToken = (user) => {
    const data = {
        id: user.id,
        username: user.username
    }
    return jwt.sign(data, 'WelcomeToTheBestSportsEventsAPI');
}

module.exports = {
    dateValidation, formatDateToLocalTime, createToken
}