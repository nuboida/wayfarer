/* eslint-disable no-useless-escape */
/* eslint-disable class-methods-use-this */
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import client from '../db/db';

class User {
  constructor() {
    this.model = client.query(`CREATE TABLE IF NOT EXISTS users (
            id UUID UNIQUE PRIMARY KEY,
            email VARCHAR(80) UNIQUE NOT NULL,
            firstName VARCHAR(80) NOT NULL,
            lastName VARCHAR(80) NOT NULL,
            password VARCHAR(80) NOT NULL,
            isAdmin BOOLEAN NOT NULL
        )`);
  }

  async create(email, fName, lName, pw) {
    if (!fName || fName === '') {
      throw new Error('First name is required');
    }
    if (!lName || lName === '') {
      throw new Error('Last name is required');
    }
    if (!email.match(/.+\@.+..+/ig)) {
      throw new Error('Fill a valid email address');
    }
    if (!pw || pw === '') {
      throw Error('Password is required');
    }
    if (pw.length < 6) {
      throw Error('Password must be atleast 6 characters');
    }

    const hashedPassword = await bcrypt.hash(pw, 10);

    await client.query(
      'INSERT INTO users (id, email, firstName, lastName, password, isAdmin) VALUES($1, $2, $3, $4, $5, false)',
      [v4(), email, fName, lName, hashedPassword],
    );

    const newUser = await client.query(
      'SELECT id, isadmin FROM users WHERE email = $1',
      [email],
    );

    return newUser.rows[0];
  }

  async getUser(email, pw) {
    if (!email && !pw) {
      throw new Error('Enter email address and password');
    }
    const user = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );

    const match = await bcrypt.compareSync(pw, user.rows[0].password);
    if (!match) {
      throw new Error('Password mismatch');
    }
    return user.rows[0];
  }
}

export default User;
