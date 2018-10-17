const config = {
	host: {
		// 设置是否启动https的服务，注意修改对应的端口号，这里端口号不会自动改为对应的默认ip
		https: false,
		port: 8012,
	},
	session: {
		secret: 'express-temp',
		name: 'express_',
		cookie: { maxAge: 1000 * 60 * 60 * 3 },
		resave: false,
		saveUninitialized: true
	},
	// @sql-on-begin
	db: {
		client: 'mysql',
		connection: {
			host     : '127.0.0.1',
			user     : 'root',
			password : 'root',
			database : 'test'
		}
	},
	// @sql-on-end
	log: {
		dir: 'logs'
	}
};

module.exports = config;