const CatModel = require("../models/categories");

exports.getAllCats = async (req) => {
  let { page = 0 } = req.query;
  let { limit = 10 } = req.query;
  const { order } = req.query;
  const { sort } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  var obj = {};

  obj[sort] = order;

  const cats = await CatModel.find()
    .sort(obj)
    .skip(page * limit)
    .limit(limit);
  const total = await CatModel.countDocuments();
  return { total, cats };
};

exports.createCat = async (cat) => {
  return await CatModel.create(cat);
};
exports.getCatById = async (id) => {
  return await CatModel.findById(id);
};

exports.updateCat = async (id, cat) => {
  return await CatModel.findByIdAndUpdate(id, cat);
};

exports.deleteCat = async (id) => {
  return await CatModel.findByIdAndDelete(id);
};
