const express = require('express');
const { getRes, RES_CODE } = require('../utils/response');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('upload');
});

router.post('/action', global.upload.single('file'), (req, res) => {
	const uploadFile = req.file;
	console.log(uploadFile);
	res.json(getRes());
});

module.exports = router;
