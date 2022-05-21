const jwtMiddleware = require("../../../config/jwtMiddleware");
const categoryProvider = require("../../app/Category/categoryProvider");
const categoryService = require("../../app/Category/categoryService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const postProvider = require("../Post/postProvider");

exports.postCategory = async function (req, res) {
    const {userIdx, categoryName} = req.body;

    if (!categoryName) return res.send(response(baseResponse.CATEGORY_NAME_EMPTY));

    const addResponse = await categoryService.createCategory(
        userIdx, categoryName
    );

    return res.send(addResponse);
}

exports.getCategory = async function (req, res) {
    const userIdx = req.params.userIdx;

    const showResponse = await categoryService.showCategory(
        userIdx
    );


    return res.send(response(baseResponse.SUCCESS, showResponse));
}

/*
exports.getPinnedCategory = async function (req, res) {
    const userIdx = req.params.userIdx;

    const showResponse = await categoryService.showPinnedCategory(
        userIdx
    );

    var names = [];

    for(var data of showResponse){
        names.push(data.categoryName);
    };

    return res.send(response(baseResponse.SUCCESS, names));
} */

exports.patchCategory = async function (req, res) {
    const {userIdx, categoryIdx} = req.body;
    const updateResponse = await categoryService.updateCategory(
        userIdx, categoryIdx
    );

    return res.send(response(baseResponse.SUCCESS));
}