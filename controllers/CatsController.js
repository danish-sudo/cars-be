const catService = require("../services/CatService");

exports.getAllCats = async (req, res) => {
  try {
    const cats = await catService.getAllCats(req);
    res.json({ data: cats.cats, total: cats.total, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCat = async (req, res) => {
  try {
    const cat = await catService.createCat(req.body);
    res.json({ data: cat, success: true });
  } catch (err) {
    console.log(err);
    res.json({ error: err.code, success: false });
  }
};

exports.getCatById = async (req, res) => {
  try {
    const cat = await catService.getCatById(req.params.id);
    res.json({ data: cat, status: "success" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.updateCat = async (req, res) => {
  try {
    const cat = await catService.updateCat(req.params.id, req.body);
    res.json({ data: cat, status: "success" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.deleteCat = async (req, res) => {
  try {
    const cat = await catService.deleteCat(req.params.id);
    res.json({ data: cat, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
