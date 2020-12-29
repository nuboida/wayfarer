/* eslint-disable class-methods-use-this */
import { v4 } from 'uuid';
import client from '../db/db';

class Trip {
  constructor() {
    this.model = client.query(`CREATE TABLE IF NOT EXISTS trips(
            tripId UUID UNIQUE PRIMARY KEY,
            busId UUID REFERENCES buses(id) NOT NULL,
            origin VARCHAR(80) NOT NULL,
            destination VARCHAR(80) NOT NULL,
            tripDate DATE NOT NULL,
            fare FLOAT NOT NULL,
            status VARCHAR(80) NOT NULL
        )`);
  }

  async createTrip(busId, origin, destination, tripDate, fare, status) {
    try {
      const newTrip = await client.query(
        'INSERT INTO trips (tripId, busId, origin, destination, tripDate, fare, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [v4(), busId, origin, destination, tripDate, fare, status],
      );

      return newTrip.rows[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getTrips() {
    try {
      const trips = await client.query('SELECT * FROM trips');
      return trips.rows;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default Trip;
