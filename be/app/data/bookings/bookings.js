const QueryBuilding = require('../../db/query_building');

// mock for calendar
const Calendar = {
    isAvailable: async () => true
};

const BOOKINGS_TABLE_NAME = "bookings";

class Bookings {

    static async book(dbConn, start, end, userDetails, businessId, serviceId) {
        let available = await Calendar.isAvailable(businessId, serviceId, start, end);
        if (!available) {
            throw new Error('attempted to book an unavailable slot');
        }

        let queryBuilder = QueryBuilding.getQueryBuilder();
        let query = queryBuilder.insert({start: start, end: end, business_id: businessId, service_id: serviceId, user_id: userDetails.userId}).into(BOOKINGS_TABLE_NAME).returning('booking_id')
        let res = await QueryBuilding.executePreparedQuery(dbConn, query);
        return res.rows[0].booking_id;
    }

    static async updateBook(dbConn, userDetails, bookId, bookDetails) {

    }

    static async removeBook(dbConn, userDetails, bookId) {

        let queryBuilder = QueryBuilding.getQueryBuilder();
        let query = queryBuilder.delete().from(BOOKINGS_TABLE_NAME).where({booking_id: bookId, user_id: userDetails.user_id});        
        return QueryBuilding.executePreparedQuery(dbConn, query);
    }

    static async getBook(dbConn, userDetails, bookId) {
        
    }

}

module.exports = Bookings;
