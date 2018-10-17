const path = require('path');
const fs = require('fs');
const { getRes, RES_CODE } = require('../utils/response');

module.exports = (app, express) => {
	const router = express.Router();

	// @template-on-begin
	router.get('/', (req, res) => {
		res.render('index', { name: 'index' });
	});
	// @template-on-end

	router.post('/verify', (req, res) => {
		if (!req.body.page) {
			res.json(getRes(RES_CODE.VERIFY_FAILD));
			return;
		}
		res.json(getRes());
	});

	initRouter(app);
	app.use('/', router);
};

// 初始化路由，读取该文件夹下的所有路由文件进行引用
function initRouter(app) {
	const files = fs.readdirSync(__dirname);
	files.forEach((file) => {
		const filename = path.basename(file, '.js');
		if(filename === 'index') return;
		app.use(`/${filename}`, require(`./${file}`));
	});
}