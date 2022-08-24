const CarModel = require("../models/cars");

exports.getAllCars = async (req) => {
  let { page = 0 } = req.query;
  let { limit = 10 } = req.query;
  const { order } = req.query;
  const { sort } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  var obj = {};

  obj[sort] = order;

  const cars = await CarModel.find()
    .sort(obj)
    .skip(page * limit)
    .limit(limit);
  const total = await CarModel.countDocuments();
  return { total, cars };
};

exports.totalCars = async (car) => {
  return await CarModel.countDocuments();
};

exports.createCar = async (car) => {
  return await CarModel.create(car);
};
exports.getCarById = async (id) => {
  return await CarModel.findById(id);
};

exports.updateCar = async (id, car) => {
  return await CarModel.findByIdAndUpdate(id, car);
};

exports.deleteCar = async (id) => {
  return await CarModel.findByIdAndDelete(id);
};
