// 모든 유저 조회
async function selectUser(connection) {
  const selectUserEmailQuery = `
                SELECT * 
                FROM Post;`;
  const [emailRows] = await connection.query(selectUserEmailQuery);
  return emailRows;
}

module.exports = {
  selectUser,
};
