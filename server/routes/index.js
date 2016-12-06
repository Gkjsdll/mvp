var router = require('express').Router();

router.use('/users', require(__dirname + '/users'));
router.use('/scores', require(__dirname + '/scores'));

module.exports = router;
