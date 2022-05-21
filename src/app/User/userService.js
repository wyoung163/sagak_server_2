const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
const { connect } = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (userName, userID, userPassword) {
  try {
    // 아이디 중복 확인
    const userIDRows = await userProvider.userIDCheck(userID);
    if (userIDRows.length > 0)
      return errResponse(baseResponse.SIGNUP_REDUNDANT_userID);

    // 비밀번호 암호화
    const encrypted_pw = bcrypt.hashSync(userPassword, 10);

    const insertUserInfoParams = [userName, userID, encrypted_pw];

    const connection = await pool.getConnection(async (conn) => conn);

    const userIdResult = await userDao.insertUserInfo(
      connection,
      insertUserInfoParams
    );

    console.log(`추가된 회원 : ${userIdResult[0].insertId}`);
    connection.release();
    return response(baseResponse.SUCCESS, userIdResult[0].insertId);
  } catch (err) {
    logger.error(`App - createUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (userID, userPassword) {
  try {
    // 아이디 여부 확인
    const userIDRows = await userProvider.userIDCheck(userID);
    if (userIDRows.length < 1)
      return errResponse(baseResponse.SIGNIN_userID_WRONG);

    const selectuserID = userIDRows[0].userID;

    // 비밀번호 확인
    const selectUserPasswordParams = [selectuserID];
    const passwordRows = await userProvider.passwordCheck(
      selectUserPasswordParams
    );

    if (!bcrypt.compareSync(userPassword, passwordRows[0].userPassword)) {
      return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }

    // 계정 상태 확인
    const userInfoRows = await userProvider.accountCheck(userID);

    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    console.log(userInfoRows[0].userID); // DB의 userId

    //토큰 생성 Service
    let token = await jwt.sign(
      {
        userId: userInfoRows[0].userID,
      }, // 토큰의 내용(payload)
      secret_config.jwtsecret, // 비밀키
      {
        expiresIn: "365d",
        subject: "User",
      } // 유효 기간 365일
    );

    return response(baseResponse.SUCCESS, {
      userId: userInfoRows[0].id,
      jwt: token,
    });
  } catch (err) {
    logger.error(
      `App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(
        err
      )}`
    );
    return errResponse(baseResponse.DB_ERROR);
  }
};
