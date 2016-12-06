var router = require('express').Router();

router.use('/users', require(__dirname + '/users'));

module.exports = router;
