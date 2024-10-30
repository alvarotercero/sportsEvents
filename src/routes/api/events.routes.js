const { getEvents, getEventById, getEventsUpcoming, getEventsByDate, postEvent, putEvent, deleteEvent } = require('../../controllers/events.controller');
const { checkToken, checkUserAllowed } = require('../../utils/middlewares');

const router = require('express').Router();

router.get('/', getEvents);
router.get('/upcoming', getEventsUpcoming);
router.get('/date', getEventsByDate)
router.get('/:id', getEventById);
router.post('/', checkToken, postEvent);
router.put('/:id', checkToken, putEvent);
router.delete('/:id', checkToken, checkUserAllowed, deleteEvent);

module.exports = router;