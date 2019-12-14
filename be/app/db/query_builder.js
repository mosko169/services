
const knex = require('knex');

class QueryBuilder {
    static getQueryBuilder() {
        return new knex({cliend: 'pg'});
    }

    static paginateQuery(query, pagination) {
        if (pagination.skip) {
            query.offset(pagination.skip);
        }
        if (pagination.limit) {
            query.limit(pagination.limit);
        }
    }

    static sortQuery(query, sorting = DEFAULT_BUSINNESES_SORT) {
        query.orderBy(sorting.sortField, sorting.order);
    }
}

module.exports = QueryBuilder;