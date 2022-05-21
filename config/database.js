const mysql = require("mysql2/promise");
const { logger } = require("./winston");

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
  host: "umc-db.ck8rockndljg.ap-northeast-2.rds.amazonaws.com",
  user: "lunar1369",
  port: "3306",
  password: "lunar1369",
  database: "sagak-db2",
});

module.exports = {
  pool: pool,
};
