// 유저 게시물 조회

async function getTitleList(connection, userIdx) {
  const getTitleFromPosts = `
	SELECT title
	FROM Post as p
	WHERE p.useridx=?
	group by title;
	`;
  const [names] = await connection.query(getTitleFromPosts, userIdx);
  //   console.log(names);

  return names;
}

async function selectUserPosts(connection, userIdx, title) {
  const getPostRows = `
		SELECT p.postIdx,p.title,p.date,p.categoryIdx
		FROM Post as p
		# Join category as c
		# on p.categoryIdx = c.categoryIdx
		WHERE p.title=? and p.userIdx=?
		`;

  const [item] = await connection.query(getPostRows, [title, userIdx]);
  //   console.log(typeof userIdx);
  return item;
}

async function selectPostbyIdx(connection, postIdx) {
  const getPostRows = `
		  SELECT *
		  FROM Post as p
		  WHERE p.postIdx=?
		  `;

  const [item] = await connection.query(getPostRows, postIdx);
  //   console.log(item[0].date.toString());
  return item;
}

module.exports = {
  getTitleList,
  selectUserPosts,
  selectPostbyIdx,
};
