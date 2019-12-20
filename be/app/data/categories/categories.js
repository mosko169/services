const QueryBuilding = require('../../db/query_building');

const CATEGORIES_TABLE_NAME = "categories";

const CATEGORIES_SORT_FIELD_NAME = "name";
const CATEGORIES_SORT_ORDER = "asc";

const CATEGORY_SEARCHABLE_FIELD = "name";

class Categories {

    static async getCount(dbConn, term) {
        let query = Categories._getCategoriesQuery(term);
        query.count("*");
        return QueryBuilding.executePreparedQuery(dbConn, query);
    }

    static async getCategories(dbConn, term, options = {}) {
        let query = Categories._getCategoriesQuery(term);
        QueryBuilding.paginateQuery(query, options.skip, options.limit);
        QueryBuilding.sortQuery(query, CATEGORIES_SORT_FIELD_NAME, CATEGORIES_SORT_ORDER);
        return QueryBuilding.executePreparedQuery(dbConn, query);
    }

    static _getCategoriesQuery(term) {
        let queryBuilder = QueryBuilding.getQueryBuilder();
        return queryBuilder.select().from(CATEGORIES_TABLE_NAME)
                                        .where(CATEGORY_SEARCHABLE_FIELD, 'like', QueryBuilding.termPattern(term));
    }
}

module.exports = Categories;
