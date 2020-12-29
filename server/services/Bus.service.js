/* eslint-disable class-methods-use-this */
import { v4 } from 'uuid';
import client from '../db/db';

class Bus {
  constructor() {
    this.model = client.query(`CREATE TABLE IF NOT EXISTS buses(
            id UUID UNIQUE PRIMARY KEY,
            numberPlate VARCHAR(80) UNIQUE NOT NULL,
            manufacturer VARCHAR(80),
            model VARCHAR(80),
            year VARCHAR(80),
            capacity INTEGER NOT NULL
        )`);
  }

  async createBus(plateNo, manufacturer, model, year, capacity) {
    try {
      const newBus = await client.query(
        'INSERT INTO buses (id, numberPlate, manufacturer, model, year, capacity) VALUES($1, $2, $3, $4, $5, $6)',
        [v4(), plateNo, manufacturer, model, year, capacity],
      );
      return newBus.rows[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getBus(id) {
    try {
      const bus = client.query(
        'SELECT * FROM buses WHERE id = $1',
        [id],
      );
      return bus.rows[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default Bus;
