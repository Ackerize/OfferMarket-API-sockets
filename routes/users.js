var { Router } = require('express');
var router = Router();
const { create, getOne } = require('../controllers/user.controller');

router.get('/:uid', getOne);
router.post('/', create);

module.exports = router;
