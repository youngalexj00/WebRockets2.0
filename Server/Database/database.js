const { Pool } = require('pg');

const PG_URI = 'postgres://rsygllqn:JEWQBBuIotnIJK08BICtRRE4UWbiWgkL@lallah.db.elephantsql.com:5432/rsygllqn';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = pool;