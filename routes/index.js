var { Router } = require('express');
var router = Router();
const usersRouter = require('./users');

router.use('/users', usersRouter);


module.exports = router;
