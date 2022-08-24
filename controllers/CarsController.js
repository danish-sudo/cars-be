const carService = require("../services/CarService");
const CatModel = require("../models/categories");

exports.getAllCars = async (req, res) => {
  try {
    const cars = await carService.getAllCars(req);

    res.json({ data: cars.cars, total: cars.total, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCar = async (req, res) => {
  try {
    const car = await carService.createCar(req.body);
    res.json({ data: car, success: true });
  } catch (err) {
    console.log(err);
    res.json({ error: err.code, success: false });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await carService.getCarById(req.params.id);
    res.json({ data: car, status: "success" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await carService.updateCar(req.params.id, req.body);
    res.json({ data: car, status: "success" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await carService.deleteCar(req.params.id);
    res.json({ data: car, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
