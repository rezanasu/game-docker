const express = require("express")
const router = express.Router();
const GameController = require("../controllers/gameController.js")

router.get("/games", GameController.findAll);
router.get("/games/:id", GameController.findOne);
router.post("/games", GameController.create);
router.put("/games/:id", GameController.update);
router.delete("/games/:id", GameController.destroy);


module.exports = router;