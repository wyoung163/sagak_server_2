// 모든 유저 조회
async function selectUserID(connection,  userID) {
  const selectUserIDQuery = `
                SELECT userID
                FROM User
                WHERE userID = ?;`;
  const [UserIDRows] = await connection.query(selectUserIDQuery, userID);
  return UserIDRows;
}

async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User(userName, userID, userPassword)
        VALUES (?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT userName, userID, userPassword
        FROM User
        WHERE userID = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

async function selectUserAccount(connection, userID) {
  const selectUserAccountQuery = `
        SELECT status, userID
        FROM User
        WHERE userID = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      userID
  );
  return selectUserAccountRow[0];
}

module.exports = {
  selectUserID,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount
};

