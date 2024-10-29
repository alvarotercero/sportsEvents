const router = require('express').Router();

router.use('/events', require('./api/events.routes'));
router.use('/users', require('./api/users.routes'));

module.exports = router;