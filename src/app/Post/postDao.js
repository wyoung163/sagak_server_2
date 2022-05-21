// 유저 게시물 조회

async function getTitleList(connection, userIdx) {
  const getTitleFromPosts = `
	SELECT title
	FROM Post as p
	WHERE p.useridx=?
	group by title;
	`;
  const [names] = await connection.query(getTitleFromPosts, userIdx);
  console.log(names);

  return names;
}

async function selectUserPosts(connection, userIdx, title) {
  const getPostRows = `
		SELECT *
		FROM Post as p
		WHERE p.title=? and p.userIdx=?
		`;

  const [item] = await connection.query(getPostRows, [title, userIdx]);
  console.log(item);
  return item;
}

module.exports = {
  getTitleList,
  selectUserPosts,
};
