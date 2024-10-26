const { getEvents, getEventById, postEvent } = require('../../controllers/events.controller');

const router = require('express').Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', postEvent);

module.exports = router;