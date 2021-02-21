

const mysql = require('mysql');

module.exports = {
	/**
     * @param {string} query
     * @param {array} params
     */
	execute: (query, params) => new Promise((resolve, reject) => {
		try {
			const connection = mysql.createConnection({
				"host":"localhost",
				"user":"root",
				"password":"abc12345",
				"database": "user",
				"timezone":"utc",
				"dateStrings":true,
				"multipleStatements": true
			});
			connection.config.queryFormat = function (q, values) {
				try {
					if (!values) return q;
					if (q.indexOf(':') === -1) {
						return mysql.format(q, values);
					}
					const finalQuery = q.replace(/:(\w+)/g, (txt, key) => {
						if (values.hasOwnProperty(key)) {
							return this.escape(values[key]);
						}
						return txt;
					});
					return finalQuery;
				} catch (_) {
					return q;
				}
			};
			connection.connect();
			connection.query(query, params, (error, data) => {
				try {
					connection.end();
					if (error) {
						return reject(error);
					}
					return resolve(data);
				} catch (e) {
					return reject(e);
				}
			});
		} catch (error) {
			reject(error);
		}
	})
};
