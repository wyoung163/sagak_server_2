const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const categoryDao = require("./categoryDao");


exports.categoryNameCheck = async function (userIdx, categoryName) {
    const connection = await pool.getConnection(async (conn) => conn);
    const categoryNameCheckResult = await categoryDao.selectcategoryName(connection, userIdx, categoryName);
    connection.release();
  
    return categoryNameCheckResult;
  };

 