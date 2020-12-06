const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

// get all from the database
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    //convet to object for handlebars!
    const hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});


// post a new burger
router.post("/api/burgers", function (req, res) {
  burger.insertOne(req.body.burger_name, function (result) {
    console.log(result);
    res.json(result);
  });
});


// update devoured false to true (when devour btn is clicked)
router.put("/api/burgers/devoured/:id", function (req, res) {
  const condition = `id = ${req.params.id};`;
  const boolean = req.body.devoured;

  // console.log(condition);
  // console.log("req.body.devoured", boolean);

  burger.updateOne(boolean, condition, function (result) {
    if (result.changedRows === 0) {
      //if no rows were changed, the ID must not exist so 404
      return res.status(404).end();
    }
    // console.log(`changeRows: ${result.changedRows}`);
    res.status(202).end();
  });
});


//delete devoured burger (when delete btn is clicked)
router.delete("/api/burgers/:id", function (req, res) {
  const condition = `id = ${req.params.id}`;

  burger.deleteOne(condition, function (result) {
    if (result.affectedRows === 0) {
      //if no rows were changed, the ID must not exist so 404
      return res.status(404).end();
    }
    // console.log(`changeRows: ${result.changedRows}`);
    res.status(202).end();
  });
});


module.exports = router;