var middleware = {};

middleware.isLoggedIn = (req, res, next) => {
	if(req.session._id) {
		next();
	} else {
		return res.status(403).json({ message: "Please login!" });
	}
}

module.exports = middleware;