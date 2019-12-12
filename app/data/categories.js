

class Categories {

    static async getCount(dbConn, term) {
        let res = dbConn.query("SELECT COUNT(*) from categories where category_name=$1*", [term]);
    }

    static async getCategories(dbConn, term, pagination) {
        let res = await dbConn.paginatedQuery("SELECT * from categories where category_name like $1", "category_name", pagination.skip, pagination.limit, [term + '%']);
        return res.rows;
    }
}

module.exports = Categories;
