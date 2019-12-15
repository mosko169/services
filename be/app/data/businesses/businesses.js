const QueryBuilding = require('../../db/query_building');

const BUSINESSES_TABLE_NAME = "businesses"

const DEFAULT_BUSINNESES_SORT = {sortField: QueryBuilding.fullFieldName(BUSINESSES_TABLE_NAME, "name"), order: "asc"};

const BUSINESSES_SEARCHABLE_FIELDS = ["name", "description", "address"]
                                            .map(fieldName => QueryBuilding.fullFieldName(BUSINESSES_TABLE_NAME, fieldName));

const FILTERS = {
    price: {fieldName: "price", table: "services", operators: ["<=",">="]},
    rank: {fieldName: "rank", table: "rankings", operators: ["="]},
    services: {fieldName: "name", table: "services", operators: ["="]}
}

class Businesses {

    static async getCount(dbConn, term, filters) {
        let query = Businesses._getBusinessesSearchQuery(term, category, filters);
        query.count("*");
        return QueryBuilding.executePreparedQuery(dbConn, query);
    }

    static async getBusinesses(dbConn, term, category = null, filters = [], pagination = {}, sorting = DEFAULT_BUSINNESES_SORT) {
        let query = Businesses._getBusinessesSearchQuery(term, category, filters);
        QueryBuilding.paginateQuery(query, pagination.skip, pagination.limit);
        QueryBuilding.sortQuery(query, sorting.sortField, sorting.order);
        return QueryBuilding.executePreparedQuery(dbConn, query);
    }

    static _getBusinessesSearchQuery(term, category, filters) {
        let termPattern = QueryBuilding.termPattern(term);
        let queryBuilder = QueryBuilding.getQueryBuilder();
        let query = queryBuilder.select().from(BUSINESSES_TABLE_NAME);
        for (let searchableField of BUSINESSES_SEARCHABLE_FIELDS) {
            query.orWhere(searchableField, "like", termPattern);
        }

        if (category) {
            query.join("businesses_categories", "businesses.business_id", "=", "businesses_categories.business_id")
                .join("categories", "businesses_categories.category_id", "=", "categories.category_id")
                .where("categories.name", "=", category);
        }

        for (let filter in filters) {
            let filterData = FILTERS[filter];
            let operator = filter.operator;
            let value = filter.value;
            if (!filterData || !filterDate.operators.includes(operator)) {
                continue;
            }
            query.andWhere(QueryBuilding.fullFieldName(filterData.table, filterData.fieldName), operator, value);
        }

        return query;
    }

}

module.exports = Businesses;
