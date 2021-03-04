export default {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'userlenditdb_dev',
    host: 'db',
    dialect: 'postgres'
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'userlenditdb_test',
    host: 'db',
    dialect: 'postgres'
  }
}