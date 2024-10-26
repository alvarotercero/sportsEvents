const { getEvents, getEventById, getEventsUpcoming, postEvent, putEvent, deleteEvent } = require('../../controllers/events.controller');

const router = require('express').Router();

router.get('/', getEvents);
router.get('/upcoming', getEventsUpcoming);
router.get('/:id', getEventById);
router.post('/', postEvent);
router.put('/:id', putEvent);
router.delete('/:id', deleteEvent);

module.exports = router;