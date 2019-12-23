

class Middlewares {
    static paginate(req, res, next) {
        req.pagination = {skip: req.query.skip, limit: req.query.limit};
        next();
    }

    static sort(req, res, next) {
        let sortField = req.query.sort;
        let sortOrder = req.query.sortOrder;
        if (sortField) {
            req.sorting = {sortField: sortField, order: sortOrder};
        }
        next();
    }

    static parseFilters(req, res, next) {
        req.filters = req.body.filters || req.query.filters || {};
        next();
    }
}

module.exports = Middlewares;