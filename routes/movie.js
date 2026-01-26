const express = require('express');
const movieController = require('../controllers/movie');

const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/createMovie", verify, verifyAdmin, movieController.createMovie);

router.put("/updateMovie", verify, verifyAdmin, movieController.updateMovie);

router.delete("/deleteMovie", verify, verifyAdmin, movieController.deleteMovie);

router.get("/getAllMovies", movieController.getAllMovies);

router.get("/getSelectedMovie", movieController.getSelectedMovie); 

module.exports = router;