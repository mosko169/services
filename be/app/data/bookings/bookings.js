const QueryBuilding = require('../../db/query_building');

// mock for calendar
const Calendar = {
    isAvailable: async () => true,
    book: async () => true,
    cancelBooking: async () => true,
    updateBooking: async () => true
};

const BOOKINGS_TABLE_NAME = "bookings";

class Bookings {

    static async book(dbConn, businessId, serviceId, userDetails, start, end) {
        // TODO - make in transaction (lock)
        let available = await Calendar.isAvailable(businessId, serviceId, start, end);
        if (!available) {
            throw new Error(`attempted to book an unavailable slot: business ${businessId}, ` +
                                                                    `service ${serviceId}, ` +
                                                                    `start: ${start}, ` +
                                                                    `end: ${end}`);         
        }
        
        let queryBuilder = QueryBuilding.getQueryBuilder();
        let query = dbqueryBuilder.insert({start: start, end: end, business_id: businessId, service_id: serviceId, user_id: userDetails.userId})
                                    .into(BOOKINGS_TABLE_NAME)
                                    .returning('booking_id');
        let res = await QueryBuilding.executePreparedQuery(dbConn, query);
        let bookingId = res.rows[0].booking_id;

        // TODO check if booking in calendar is succesfull
        let booked = await Calendar.book(businessId, bookingId, start, end);

        return bookingId;
    }

    static async updateBooking(dbConn, userDetails, bookingId, newStart, newEnd) {
        // TODO - make in transaction (lock)
        let updated = await Calendar.updateBooking(bookingId, newStart, newEnd);
        if (!updated) {
            throw new Error(`could not set new times for booking ${bookingId}`);
        }
        let queryBuilder = QueryBuilding.getQueryBuilder();
        updateQuery = queryBuilder(BOOKINGS_TABLE_NAME)
                            .where('booking_id', '=' , bookingId)
                            .andWhere('user_id', '=', userDetails.userId)
                            .update({start: newStart, end: newEnd});
        return QueryBuilding.executePreparedQuery(updateQuery);
    }

    static async removeBooking(dbConn, userDetails, bookingId) {
        let queryBuilder = QueryBuilding.getQueryBuilder();
        let query = queryBuilder.delete().from(BOOKINGS_TABLE_NAME).where({booking_id: bookingId, user_id: userDetails.user_id});
        await Calendar.cancelBooking(bookingId);
        return QueryBuilding.executePreparedQuery(dbConn, query);
    }

    static async getBooking(dbConn, userDetails, bookingId) {
        let queryBuilder = QueryBuilding.getQueryBuilder();
        let query = queryBuilder.select().from(BOOKINGS_TABLE_NAME).where({booking_id: bookingId, user_id: userDetails.user_id});
        let rows = await QueryBuilding.executePreparedQuery(dbConn, query);
        if (rows.length == 0) {
            return null;
        }
        return rows[0]
    }

}

module.exports = Bookings;
