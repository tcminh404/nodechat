module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    ssl: { rejectUnauthorized: false },
    port: process.env.DB_PORT || 5432,
    max: 50,
    idleTimeoutMillis: 30000,
  },
  session_secret: "",
};
