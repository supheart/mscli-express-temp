const path = require('path');
const fs = require('fs');
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const config = require('./configs');
const router = require('./router');

const app = express();

// @log-on-begin
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const logDirectory = path.join(__dirname, '..', config.log.dir);
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs('access.log', {
	interval: '1d',
	path: logDirectory
});
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('tiny'));
// @log-on-end

// @base-on-begin
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session(config.session));
// @base-on-end

// @template-on-begin
const ejs = require('ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);
app.use(express.static(path.join(__dirname , 'public')));
// @template-on-end

// @upload-on-begin
const multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/uploads/');
	},
	filename: function (req, file, cb) {
		let pre = file.mimetype.split('/')[1] || '';
		if(pre) pre = '.' + pre;
		cb(null, `${Date.now()} - ${file.originalname}${pre}`);
	}
});
global.upload = multer({ storage: storage });
// @upload-on-end

// @sql-on-begin
const knex = require('knex');
global.knex = knex(config.db);
global.knex.raw('set names utf8mb4').asCallback(function () {
	global.knex.raw('show variables like \'character_set_%\'').asCallback(function (err, data) {
		console.info(JSON.stringify(data));
	});
});
// @sql-on-end

// router & filter
const filter = require('./utils/filter');
app.use(filter.index);
router(app, express);

module.exports = app;
