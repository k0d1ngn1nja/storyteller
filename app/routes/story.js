const router = require('express').Router();
const v = require('../config/validation');
const storyCntrl = require('../controllers/story');

router.get('/stories', storyCntrl.index);

router.get('/stories/new', v.isLoggedIn, storyCntrl.new);

router.get('/stories/edit/:id', v.isLoggedIn, storyCntrl.edit);

router.get('/stories/show/:id', storyCntrl.show);

router.post('/stories', v.isLoggedIn, storyCntrl.create);

router.put('/stories/:id', v.isLoggedIn, storyCntrl.update);

module.exports = router;