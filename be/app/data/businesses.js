
const BUSINESSES_TABLE_NAME = "businesses"

const DEFAULT_BUSINNESES_SORT = {sortField: BUSINESSES_TABLE_NAME+".name", order: "asc"};

const WILDCARD = "%";

const BUSINESSES_SEARCHABLE_FIELDS = ["name", "description", "address"]
                                            .map(fieldName => BUSINESSES_TABLE_NAME + "." + fieldName);

class Businesses {

    static async getCount(dbConn, term, filters) {
    }

    static async getBusinnesses(dbConn, term, category = null, filters = [], pagination = null, sorting = DEFAULT_BUSINNESES_SORT) {
        let query = Businesses._getBusinessesSearchQuery(term, category, filters, pagination, sorting);
        let res = await dbConn.executePreparedQuery(query, pagination, sorting);
        return res.rows;
    }

    static _getBusinessesSearchQuery(term, category, filters, pagination, sorting) {
        let termPattern = term + WILDCARD;
        let queryBuilder = dbConn.getQueryBuilder();
        let query = queryBuilder.select().from(BUSINESSES_TABLE_NAME);
        for (let searchableField of BUSINESSES_SEARCHABLE_FIELDS) {
            query.andWhere(searchableField, "like", termPattern);
        }

        if (category) {
            query.join("businesses_categories", "businesses.business_id", "=", "businesses_categories.business_id")
                .join("categories", "businesses_categories.category_id", "=", "categories.category_id")
                .where("categories.name", "=", category);
        }
        if (filters.fromDate || filters.toDate) {
            // TODO - add openning hours and available hours support
        }

        Businesses.prepareFilters(query, filters);
    }
}

module.exports = Businesses;
