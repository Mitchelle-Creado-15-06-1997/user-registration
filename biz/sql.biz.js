const QueryRepo = require('../repository/query.repository');

class SqlBiz {
	constructor() {
        this.queryRepo = new QueryRepo();
	}
    get_one(data,query) {
		return new Promise(async (resolve, reject) => {	
			try {
          let raw = await this.queryRepo.get_all_data(query,data);
          let result = raw
          resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }
   
}

module.exports = SqlBiz;
