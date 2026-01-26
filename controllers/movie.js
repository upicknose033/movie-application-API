const Workout = require("../models/Movie");
const { errorHandler } = require('../auth');

module.exports.createMovie = (req, res) => {
		let newMovie = new Movie({
		title : req.body.title,
		director : req.body.director,
		year : req.body.year,
		description : req.body.description,
		comments : req.body.comments
	});

	Movie.findOne({ title: req.body.title })
	.then(existingMovie =>{
		if(existingMovie) {
			return res.status(409).send({message : 'Movie already exists'});
		} else {
			return newMovie.save()
            .then(result => res.status(201).send({
                success: true,
                message: 'Movie added successfully',
                result: result
            })).catch(error => errorHandler(error, req, res))
		}
	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.updateMovie = (req, res) => {
	    let updateData = {
		title : req.body.title,
		director : req.body.director,
		year : req.body.year,
		description : req.body.description,
		comments : req.body.comments
    };

    return Workout.findByIdAndUpdate(req.body.movieId, updateData, { new: true })
    .then(movie => {
        if (movie) {
            res.status(200).send({
                success: true,
                updatedMovie: movie
            });
        } else {
            res.status(404).send({ success: false, message: "Movie not found" });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.deleteMovie = (req, res) => {
	const { movieId } = req.body;

	Workout.findByIdAndDelete(movieId)
	.then(deletedMovie => {
		if (!deletedMovie) {
			return res.status(409).send({message : 'Movie does not exist'});
		}
		res.status(200).send({ message: "Movie deleted successfully" });
	})
	.catch(error => errorHandler(error, req, res)); 

};


module.exports.getAllMovies = (req, res) => {
	return Movie.find({})
	.then(movies => {
		if(movies.length > 0){
			return res.status(200).send({ movies });
		} else {
			return res.status(404).send({ message: "No movies found." });
		}
	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.getSelectedMovie = (req, res) => {
	const { movieId } = req.body;

	Movie.findById(movieId)
	.then(movie => {
		if(movie){
			return res.status(200).send(movie);
		} else {
			return res.status(404).send({ message: "Movie not found" })
		}

	})
	.catch(error => errorHandler(error, req, res));
};