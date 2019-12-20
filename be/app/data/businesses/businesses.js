const QueryBuilding = require('../../db/query_building');

const BUSINESSES_TABLE_NAME = "businesses"

const DEFAULT_BUSINNESES_SORT = {sortField: QueryBuilding.fullFieldName(BUSINESSES_TABLE_NAME, "name"), order: "asc"};

const BUSINESSES_SEARCHABLE_FIELDS = ["name", "description", "address"]
                                            .map(fieldName => QueryBuilding.fullFieldName(BUSINESSES_TABLE_NAME, fieldName));

const FILTERS = {
    category: {tableName: "categories", fieldName: "name", operator: "in"},
    minPrice: {tableName: "services", fieldName: "price", operator: ">="},
    maxPrice: {tableName: "services", fieldName: "price", operator: "<="},
    businesses_ranks: {tableName: "businesses_ranks", fieldName: "rank", operator: "in"}
}

const TABLE_JOINS = {
    categories: (query) => query.join("businesses_categories", "businesses.business_id", "=", "businesses_categories.business_id")
                                .join("categories", "businesses_categories.category_id", "=", "categories.category_id"),

    services: (query) => query.join("services", "businesses.business_id", "=", "services.business_id"),

    ranks: (query) => query.join("businesses_ranks", "businesses.business_id", "=", "businesses_ranks.business_id"),

    businesses: (query) => {}
}

class Businesses {

    static async getCount(dbConn, term, filters) {
        let query = Businesses._getBusinessesSearchQuery(term, category, filters);
        query.count("*");
        return QueryBuilding.executePreparedQuery(dbConn, query);
    }

    static async getBusinesses(dbConn, term, filters = {}, pagination = {}, sorting = DEFAULT_BUSINNESES_SORT) {
        let query = Businesses._getBusinessesSearchQuery(term, filters);
        QueryBuilding.paginateQuery(query, pagination.skip, pagination.limit);
        QueryBuilding.sortQuery(query, sorting.sortField, sorting.order);
        return QueryBuilding.executePreparedQuery(dbConn, query);
    }

    static _getBusinessesSearchQuery(term, filters) {
        let termPattern = QueryBuilding.termPattern(term);
        let queryBuilder = QueryBuilding.getQueryBuilder();
        let query = queryBuilder.select().from(BUSINESSES_TABLE_NAME);
        for (let searchableField of BUSINESSES_SEARCHABLE_FIELDS) {
            query.orWhere(searchableField, "like", termPattern);
        }

        Businesses._applyFilters(query, filters);

        return query;
    }

    static _applyFilters(query, filters) {
        let joinedTables = new Set();
        for (let filter in filters) {
            let filterData = FILTERS[filter];
            if (!filterData) {
                continue;
            }
            let filterTable = filterData.tableName;
            if (!joinedTables.has(filterTable)) {
                Businesses._applyJoin(query, filterData.tableName)
                joinedTables.add(filterTable);
            }
            let operator = filterData.operator;
            let filterValue = filters[filter];
            if (operator == "in" && !Array.isArray(filter)) {
                filterValue = [filterValue];
            }
            query.andWhere(QueryBuilding.fullFieldName(filterData.tableName, filterData.fieldName), operator, filterValue);
        }
    }

    static _applyJoin(query, tableName) {
        TABLE_JOINS[tableName](query);
    }

}

Businesses.BUSINESSES_TABLE_NAME = BUSINESSES_TABLE_NAME;
module.exports = Businesses;
