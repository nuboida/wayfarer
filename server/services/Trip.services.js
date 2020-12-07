/* eslint-disable class-methods-use-this */
import client from '../db/db';

class Trip {
  constructor() {
    this.model = client.query(`CREATE TABLE IF NOT EXISTS trips(
            id UUID UNIQUE PRIMARY KEY,
            bus_id UUID REFERENCES bus(id) NOT NULL,
            origin VARCHAR(80) NOT NULL,
            destination VARCHAR(80) NOT NULL,
            trip_date DATE NOT NULL,
            fare FLOAT NOT NULL,
            status VARCHAR(80) NOT NULL
        )`);
  }

  async getTrips() {
    try {
      const trips = await client.query('SELECT * FROM trips');
      return trips.rows;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Trip;
