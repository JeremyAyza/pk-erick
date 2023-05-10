//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { populateTypesOnDB } = require('./src/controllers/type.controller.js');
const { conn } = require('./src/db');

// Syncing all the models at once.
conn.sync()
	.then(() => {
		server.listen(3001, () => {
			console.log('Server listening on 3001');
			//se llena la tabla tipos en la db con la api externa, si es que es necesario
			populateTypesOnDB();
		});
	})
	.catch((err) => {
		console.error(`Error syncing database: ${err.message}`);
	});
