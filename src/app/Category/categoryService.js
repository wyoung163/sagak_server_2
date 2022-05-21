const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const categoryProvider = require("./categoryProvider");
const categoryDao = require("./categoryDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
const { connect } = require("http2");

exports.createCategory = async function (userIdx, categoryName) {
    try {
      // 카테고리 중복 확인
      const categoryNameRows = await categoryProvider.categoryNameCheck(userIdx, categoryName);
      if (categoryNameRows.length > 0)
        return errResponse(baseResponse.CATEGORY_REDUNDANT_NAME);
  
      //const insertcategoryNameParams = [userIdx, categoryName];
  
      const connection = await pool.getConnection(async (conn) => conn);
  
      const categoryResult = await categoryDao.insertcategoryName(
        connection, userIdx, categoryName
      );
  
      connection.release();
      return response(baseResponse.SUCCESS);
    } catch (err) {
      logger.error(`App - createUser Service error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
  };

  exports.showCategory = async function (userIdx) {
    try {  
      const connection = await pool.getConnection(async (conn) => conn);
  
      const categoryResult = await categoryDao.showCategoryName(
        connection, userIdx
      );

      connection.release();
      console.log(categoryResult);
      return categoryResult;

    } catch (err) {
      logger.error(`App - createUser Service error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
  };

  exports.updateCategory = async function (userIdx, categoryIdx) {
    try {  
      const connection = await pool.getConnection(async (conn) => conn);
  
      const categoryPinResult = await categoryDao.updateCategoryPin(
        connection, userIdx, categoryIdx
      );

      connection.release();
      console.log(categoryPinResult);
      return categoryPinResult;

    } catch (err) {
      logger.error(`App - createUser Service error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
  };

  
/*
  exports.showPinnedCategory = async function (userIdx) {
    try {  
      const connection = await pool.getConnection(async (conn) => conn);
  
      const categoryResult = await categoryDao.showPinnedCategoryName(
        connection, userIdx
      );
      
      connection.release();
      return categoryResult;

    } catch (err) {
      logger.error(`App - createUser Service error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
  };
  */