const { BaseException } = require('../exceptions');

class InvalidRequestException extends BaseException {
	constructor() {
		super(`Bad request: Insufficient Data`, 400);
	}
}

module.exports = InvalidRequestException;
