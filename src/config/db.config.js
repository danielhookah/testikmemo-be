module.exports = {
  port: 5432,
  HOST: "localhost",
  USER: "main",
  PASSWORD: "main1324",
  DB: "memo",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
