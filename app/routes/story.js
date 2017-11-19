const router = require('express').Router();
const v = require('../config/validation');
const storyCntrl = require('../controllers/story');

router.get('/stories', storyCntrl.index);

router.get('/stories/new', storyCntrl.new);

router.get('/stories/:id/edit', storyCntrl.edit);

router.get('/stories/show/:id', storyCntrl.show);

router.post('/stories', storyCntrl.create);

// router.put('/stories/:id', storyCntrl.update);

module.exports = router;