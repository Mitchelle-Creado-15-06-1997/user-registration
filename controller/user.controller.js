const UserBiz = require('../biz/user.biz')
const userBiz = new UserBiz();
const { InvalidRequestException } = require('../exceptions');
exports.registration = async (req, res, next) => {
    try {
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.uniqueId || !req.body.OrganisationName) {
            throw new InvalidRequestException();
        }
        const message = await userBiz.registration(req.body);
        res.send({
            code: 'SUCCESS',
            message: message,
            success: true
        });
    } catch(e) {
        res.send({
            code: 'ERROR',
            message: e.message,
            success: false,
            status_code: 500
        });
    }
}

exports.login = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            throw new InvalidRequestException();
        }
        const message = await userBiz.login(req.body);
        res.send({
            code: 'SUCCESS',
            message: message,
            success: true
        });
    } catch(e) {
        res.send({
            code: 'ERROR',
            message: e.message,
            success: false,
            status_code: 500
        });
    }
}

exports.modifySearch = async (req, res, next) => {
    try {
        const sort = req.query.sort;
        const serach = {};

        if (req.query.first_name) serach.first_name = req.query.first_name;
        if (req.query.last_name) serach.last_name = req.query.last_name;
        if (req.query.employee_id) serach.employee_id = req.query.employee_id;

        const pagination = req.query.pagination;
        const offset = req.query.offset;
        const message = await userBiz.modifySearch(sort, serach, pagination, offset);
        res.send({
            code: 'SUCCESS',
            message: message,
            success: true
        });
    } catch(e) {
        res.send({
            code: 'ERROR',
            message: e.message,
            success: false,
            status_code: 500
        });
    }
}


