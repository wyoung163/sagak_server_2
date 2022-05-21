const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const postProvider = require("../Post/postProvider");

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
  const { userName, userID, userPassword, password_check } = req.body;

  //빈 값 체크
  if (!userPassword) return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

  // 길이 체크
  // if (userPassword.length > 30)
    // return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

  if (userPassword == password_check) {
    //pw와 pw확인이 동일한지 확인  

    const signUpResponse = await userService.createUser(
    userName, userID, userPassword
    );

  return res.send(signUpResponse);
  } else {
    return res.send(response(baseResponse.SIGNUP_PASSWORD_CHECK));
  }
};

exports.login = async function (req, res) {

  const {userID, userPassword} = req.body;

  // TODO: email, password 형식적 Validation

  const signInResponse = await userService.postSignIn(userID, userPassword);

  return res.send(signInResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API
 * [GET] /app/users

exports.getUsers = async function (req, res) {
  const userListResult = await userProvider.retrieveUserList();
  return res.send(response(baseResponse.SUCCESS, userListResult));
};
*/
