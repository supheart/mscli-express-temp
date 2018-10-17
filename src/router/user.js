const express = require('express');
const { getRes, RES_CODE } = require('../utils/response');
const router = express.Router();

// @template-on-begin
router.get('/', (req, res) => {
	res.render('user');
});
// @template-on-end

router.post('/add', (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.json(getRes(RES_CODE.USERNAME_OR_PASSWORD_ERROR));
		return;
	}
	res.json(getRes());
});

module.exports = router;
