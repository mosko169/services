const knex = require('knex');

const WILDCARD = "%";

const DEFAULT_LIMIT = 10;

class QueryBuilding {
    static getQueryBuilder() {
        return new knex({client: 'pg'});
    }

    static paginateQuery(query, skip = 0, limit = DEFAULT_LIMIT) {
        if (skip) {
            query.offset(skip);
        }
        if (limit) {
            query.limit(limit);
        }
    }

    static termPattern(term) {
        return term == "" ? term : term + WILDCARD;
    }

    static fullFieldName(table, fieldName) {
        return table + "." + fieldName;
    }

    static sortQuery(query, sortField, sortOrder) {
        query.orderBy(sortField, sortOrder);
    }

    static async executePreparedQuery(dbConn, query) {
        let preparedQuery = query.toSQL().toNative();
        let res = await dbConn.query(preparedQuery.sql, preparedQuery.bindings);
        return res.rows;
    }
}

module.exports = QueryBuilding;
