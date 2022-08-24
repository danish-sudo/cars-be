const express = require("express");
const {
  getAllCats,
  createCat,
  getCatById,
  updateCat,
  deleteCat,
} = require("../controllers/CatsController");

const router = express.Router();

router.route("/").get(getAllCats).post(createCat);
router.route("/:id").get(getCatById).put(updateCat).delete(deleteCat);

module.exports = router;
