const express = require("express");
const router = express.Router();
const { Collectors, validateCollector } = require("../models/collectorSchema");

router.get("/", async (req, res) => {
  try {
    let collectors = await Collectors.find();
    res.status(200).json({
      state: true,
      msg: "Expenses have succesfully been read",
      innerData: collectors,
    });
  } catch {
    res
      .status(500)
      .json({ state: false, msg: "Server error", innerData: null });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateCollector(req.body);
    if (error) {
      return res
        .status(401)
        .json({ state: false, msg: `${error.message},innerData:null` });
    }
    let { izoh, select, summa } = req.body;

    let newCollects = await Collectors.create({
      izoh,
      select,
      summa,
    });

    let saveCollectors = await newCollects.save();
    res
      .status(201)
      .json({
        state: true,
        msg: "Expenses have succesfully been created",
        innerData: saveCollectors,
      });
  } catch {
    res
      .status(500)
      .json({ state: false, msg: "server error", innerData: null });
  }
});

module.exports = router;
