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

async function getTitleListByCategory(connection, userIdx, categoryIdx) {
  const getTitleFromPostsByCate = `
	SELECT title
	FROM Post as p
	WHERE p.useridx=? and categoryIdx=?
	group by title;
	`;
  const [names] = await connection.query(getTitleFromPostsByCate, [
    userIdx,
    categoryIdx,
  ]);
  return names;
}

async function selectUserPosts(connection, userIdx, title) {
  const getPostRows = `
		SELECT p.postIdx,p.title,p.date,p.categoryIdx,c.categoryName,j.imgUrl
		FROM Post as p
		Join Category as c
		On p.categoryIdx = c.categoryIdx
		Join ImgUrl as j
		On p.postIdx = j.postIdx
		WHERE p.title=? and p.userIdx=?
		group by postIdx
		`;

  const [item] = await connection.query(getPostRows, [title, userIdx]);
  //   console.log(typeof userIdx);
  return item;
}

async function selectPostbyIdx(connection, postIdx) {
  const getPostRows = `
		  SELECT p.postIdx,p.title,p.place,p.date,p.description
		  FROM Post as p
		  WHERE p.postIdx=?
		  `;

  const [item] = await connection.query(getPostRows, postIdx);
  //   console.log(item[0].date.toString());
  return item;
}

async function getImgUrlByPostIdx(connection, postIdx) {
  const getImgUrlRows = `
	SELECT i.imgUrlIdx, i.imgUrl
	FROM ImgUrl as i
	WHERE i.postIdx = ?
	`;
  const [item] = await connection.query(getImgUrlRows, postIdx);
  //   console.log(item[0].date.toString());
  return item;
}

async function insertPostInfo(connection, insertPostInfoParams) {
  const insertPost = `        
			INSERT INTO Post(userIdx, title, date,place,categoryIdx,description)
			VALUES (?, ?, ?,?,?,?);
			`;
  const [item] = await connection.query(insertPost, insertPostInfoParams);
  return item;
}

async function insertImgInfo(connection, insertImgInfoParams) {
  const insertPost = `        
			  INSERT INTO ImgUrl(postIdx, imgUrl)
			  VALUES (?, ?);
			  `;
  const [item] = await connection.query(insertPost, insertImgInfoParams);
  return item;
}

module.exports = {
  getTitleList,
  selectUserPosts,
  selectPostbyIdx,
  getImgUrlByPostIdx,
  getTitleListByCategory,
  insertPostInfo,
  insertImgInfo,
};
