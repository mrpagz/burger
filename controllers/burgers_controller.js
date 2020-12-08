const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();


router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/burgers", function (req, res) {
    burger.all(function (data) {
        res.json({ burgers: data });
    });
});

//will handle creating new burgers
router.post("/burgers", function (req, res) {
    burger.create(req.body.burger_name, function (result) {
        console.log("Controller hit!");
        // Send back the ID of the new quote
        res.json(result);
    });
});

//will handle changing burgers to "devoured"
router.put("/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    
    burger.update({
        devoured: 1
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id });
        }
    });
});

router.delete("/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    
    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;