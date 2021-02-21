const db = require('./db');

class UserRepo {
    constructor() {
    }
    employeeRegistration(body) {
        return new Promise(async (resolve, reject) => {
			try {
                const params = [
                    body.uniqueId,
                    body.OrganisationName
                ]
				const query = `insert ignore into employees (id, org_name) values (?, ?)`;
				const result = await db.execute(query, params);
                if (result.affectedRows) {
                    resolve('Registration Success');
                } else {
                    reject(new Error('Enter unique employee ID'));
                }
			} catch (error) {
				reject(error);
			}
		});
    }

    registration(body) {
        return new Promise(async (resolve, reject) => {
			try {
                const params = [
                    body.firstName,
                    body.lastName,
                    body.email,
                    body.password,
                    body.uniqueId,
                ]
				const query = `insert ignore into users (first_name, last_name, email, password, employee_id) values (?, ?, ?, ?, ?)`;
                const result = await db.execute(query, params);
                if (result) {
                    resolve('Registration Success');
                } else {
                    reject(new Error('User Exists'));
                }
			} catch (error) {
				reject(error);
			}
		});
    }

    login(body) {
        return new Promise(async (resolve, reject) => {
			try {
                const params = [
                    body.email,
                    body.password
                ]
				const query = `select 1 from users where email = ? and password = ?`;
                const result = await db.execute(query, params);
                if (result && result.length) {
                    resolve('Login Success');
                } else {
                    reject(new Error('User does not exists'));
                }
				
			} catch (error) {
				reject(error);
			}
		});
    }

    modifySearch(sort, serach, pagination) {
        return new Promise(async (resolve, reject) => {
			try {
                
				const query = `select u.first_name, u.last_name, u.email, u.employee_id, e.org_name from users u join employees e on u.employee_id = e.id ${serach}`;
				const result = await db.execute(query);
                if (result && result.length) {
                    resolve(result);
                } else {
                    reject(new Error('User not found'));
                }
                
			} catch (error) {
				reject(error);
			}
		});
    }
}

module.exports = UserRepo;