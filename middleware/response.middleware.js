
module.exports = async (request, response, next) => {
	try {
		const oldJson = response.json;

		response.json = (data, message, serviceData = null) => {
			let newResponseData = {};
			if (data && data.success) {
				newResponseData = {
					status_code: 200,
					success: true,
					message: data.message,
					data: data.processed
				};
			} else {
				if (data && data.status_code) response.status(data.status_code);
				newResponseData = {
					status_code: data && data.status_code || 500,
					success: false,
					message: data && data.message || 'Something went wrong',
					stack: data && data.stack || [],
				};
			}

			response.json = oldJson;
			response.fields = [];
			return oldJson.call(response, newResponseData);
		};
		next();
	} catch (error) {
		next(error);
	}
};
