export default () => ({
  secret: process.env.APP_SECRET || "secret",
  algorithm: process.env.APP_ALGORITHM || "aes-256-ctr",
  auth: {
    expiresIn: parseInt(process.env.APP_AUTH_EXPIRES_IN, 10) || 604800,
  },
  throttler: {
    ttl: parseInt(process.env.APP_THROTTLER_TTL, 10) || 30000,
    limit: parseInt(process.env.APP_THROTTLER_LIMIT, 10) || 30,
  },
  database: {
    type: process.env.DATABASE_TYPE || "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME || "test",
  },
});
