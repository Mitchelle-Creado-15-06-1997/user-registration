const UserRepo = require('../repository/user.repository');
const QueryBuilderBiz = require('./query-builder.biz');
const Sql = require('./sql.biz')
class UserBiz {
    constructor() {
       this.userRepo = new UserRepo();
       this.sql = new Sql();
    }
    registration(body) {
        return new Promise(async (resolve, reject) => {
			try {
                body.password = Buffer.from(body.password).toString('base64');
                const registered = await this.userRepo.employeeRegistration(body);
                if (registered) {
                    await this.userRepo.registration(body);
                }
                return resolve(registered);
            } catch (error) {
				return reject(error);
			}
		});
    }

    login(body) {
        return new Promise(async (resolve, reject) => {
			try {
                body.password = Buffer.from(body.password).toString('base64');
                const registered = await this.userRepo.login(body);
                return resolve(registered);
            } catch (error) {
				return reject(error);
			}
		});
    }

    modifySearch(sort, serach, pagination, offset) {
        return new Promise(async (resolve, reject) => {
			try {
                const queryBuilderBiz = new QueryBuilderBiz('users', 'employees e');
                const col1 = `employee_id`;
                const col2 = `e.id`;
                let query = await queryBuilderBiz.selectWithOrderBy(serach);
                if (sort)
                    query = query + ` order by ${sort}`;
                if (pagination) 
                    query = query + ` limit ${Number(pagination)}`;
                if (pagination && offset) 
                    query = query + ` offset ${Number(offset)}`;

               
				const result = await this.sql.get_one(null, query); 
               
                return resolve(result);
            } catch (error) {
				return reject(error);
			}
		});
    }
}
module.exports = UserBiz;