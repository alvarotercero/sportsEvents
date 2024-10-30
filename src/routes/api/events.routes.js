const { getEvents, getEventById, getEventsUpcoming, getEventsByDate, postEvent, putEvent, deleteEvent } = require('../../controllers/events.controller');
const { checkToken } = require('../../utils/middlewares');

const router = require('express').Router();

router.get('/', checkToken, getEvents);
router.get('/upcoming', getEventsUpcoming);
router.get('/date', getEventsByDate)
router.get('/:id', getEventById);
router.post('/', postEvent);
router.put('/:id', putEvent);
router.delete('/:id', deleteEvent);

module.exports = router;