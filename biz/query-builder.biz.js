const sqlBuilder = require('sql-bricks');
class QueryBuilderBiz {
	constructor(table, join) {
		this.table = table;
        this.join = join;
		this.builder = sqlBuilder;
	}

	selectWithOrderBy(where,params = "*") {
		return new Promise(async (resolve, reject) => {
			try {
				const query = this.builder.select(params).from(this.table).where(where).toString();
				return resolve(query)
			} catch(error){
				return reject(error);
			}
		});
	}
}


module.exports = QueryBuilderBiz;
