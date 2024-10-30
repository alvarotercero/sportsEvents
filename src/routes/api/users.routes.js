const { createUser, loginUser, getUserProfile } = require('../../controllers/users.controller');
const { checkToken } = require('../../utils/middlewares');

const router = require('express').Router();

router.get('/profile', checkToken, getUserProfile);
router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;