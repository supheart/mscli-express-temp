const express = require('express');
const { getRes, RES_CODE } = require('../utils/response');
const router = express.Router();

// @template-on-begin
router.get('/', (req, res) => {
	res.render('sql', { name: 'sql' });
});
// @template-on-end

router.post('/list', (req, res) => {
	global.knex.select('*').from('test').orderBy('id', 'asc').then(result => {
		res.json(getRes(result));
	}).catch(err => {
		res.json(getRes(null, 0, err.message));
	});
});

router.post('/add', (req, res) => {
	if (!req.body.key || !req.body.value) {
		res.json(getRes(RES_CODE.ERROR_PARAMS));
		return;
	}
	global.knex('test').insert({key: req.body.key, value: req.body.value}).then(result => {
		res.json(getRes(String(result[0])));
	}).catch(err => {
		res.json(getRes(null, 0, err.message));
	});
});

router.delete('/', (req, res) => {
	if(!req.query.id) {
		res.json(getRes(RES_CODE.ERROR_PARAMS));
		return;
	}
	global.knex('test').where('id', req.query.id).del().then(result => {
		res.json(getRes(String(result)));
	}).catch(err => {
		res.json(getRes(null, 0, err.message));
	});
});

router.post('/update', (req, res) => {
	const { id, key, value } = req.body;
	if(!id || !key || !value) {
		res.json(getRes(RES_CODE.ERROR_PARAMS));
		return;
	}
	global.knex('test').where('id', id).update({ key, value }).then(result => {
		if(result > 0) {
			res.json(getRes({ id, key, value }));
		} else {
			res.json(getRes());
		}
	}).catch(err => {
		res.json(getRes(null, 0, err.message));
	});
});

module.exports = router;
