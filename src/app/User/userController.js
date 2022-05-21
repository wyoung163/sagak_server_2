const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const postProvider = require("../Post/postProvider");

const regexEmail = require("regex-email");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
// exports.getTest = async function (req, res) {
//     return res.send(response(baseResponse.SUCCESS))
// }

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {
  /**
   * Body: email, password, nickname
   */
  const { email, password, nickname } = req.body;

  // 빈 값 체크
  if (!email) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

  // 길이 체크
  if (email.length > 30)
    return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

  // 형식 체크 (by 정규표현식)
  if (!regexEmail.test(email))
    return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

  // 기타 등등 - 추가하기

  const signUpResponse = await userService.createUser(
    email,
    password,
    nickname
  );

  return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {
  /**
   * Query String: email
   */

  const userListResult = await userProvider.retrieveUserList();
  return res.send(response(baseResponse.SUCCESS, userListResult));
};
