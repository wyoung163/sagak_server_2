
async function selectcategoryName(connection, userIdx, categoryName) {
    const selectcategoryNameQuery = `
                  SELECT categoryName
                  FROM Category
                  WHERE categoryName = ? and userIdx = ?;`;
    const [categoryNameRows] = await connection.query(selectcategoryNameQuery, [categoryName, userIdx]);
    console.log(categoryNameRows);
    return categoryNameRows;
}

 async function insertcategoryName(connection, userIdx, categoryName) {
   const insertcategoryNameQuery = `
         INSERT INTO Category(userIdx, categoryName, pinned)
         VALUES (?, ?, ?);
    `;
   const insertcategoryNameRow = await connection.query(
     insertcategoryNameQuery,
     [userIdx, categoryName, 0]
   );
   console.log(insertcategoryNameRow);
 
   return insertcategoryNameRow;
}

async function showCategoryName(connection, userIdx) {

    const showUnpinnedNameQuery = `
                  SELECT categoryIdx, categoryName, pinned
                  FROM Category
                  WHERE userIdx = ? and pinned = ?
                  ORDER BY createdAt DESC;`;
    const [unpinnedcategoryNameRows] = await connection.query(showUnpinnedNameQuery, [userIdx, 0]);

    const showPinnedNameQuery = `
                  SELECT categoryIdx, categoryName, pinned
                  FROM Category
                  WHERE userIdx = ? and pinned = ?
                  ORDER BY createdAt DESC;`;
    const [pinnedcategoryNameRows] = await connection.query(showPinnedNameQuery, [userIdx, 1]);

    const categoryNameRows = [];
    categoryNameRows.push(unpinnedcategoryNameRows);
    categoryNameRows.push(pinnedcategoryNameRows);

    return (categoryNameRows);
}

async function updateCategoryPin(connection, userIdx, categoryIdx) {

    const getPinBooleanQuery = `
        SELECT pinned
        FROM Category
        WHERE userIdx = ? and categoryIdx = ?`;

    const [originCategoryPinRow] = await connection.query(getPinBooleanQuery, [userIdx, categoryIdx]);
   
    const updateCategoryPinQuery = `
                  UPDATE Category
                  SET pinned = ?
                  WHERE userIdx = ? and categoryIdx = ?`;
    
    if(originCategoryPinRow == 0){
        var [updateCategoryPinRow] = await connection.query(updateCategoryPinQuery, [1, userIdx, categoryIdx]);
    } else {
        updateCategoryPinRow = await connection.query(updateCategoryPinQuery, [0, userIdx, categoryIdx]);
    }
    
    return (updateCategoryPinRow);
}

/*
async function showPinnedCategoryName(connection, userIdx) {
    const showpinnedcategoryNameQuery = `
                  SELECT categoryName
                  FROM Category
                  WHERE userIdx = ? and pinned = ?;`;
    const [pinnedcategoryNameRows] = await connection.query(showpinnedcategoryNameQuery, [userIdx, 1]);
    console.log(pinnedcategoryNameRows);
    return pinnedcategoryNameRows;
}  */

module.exports = {
    selectcategoryName,
    insertcategoryName,
    showCategoryName,
    updateCategoryPin
  };
  