const mongoose = require('mongoose');
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const User = mongoose.model('User');
const shortid = require("shortid");
const middleware = require('../middleware');
const errorUrl='http://localhost/error';

module.exports = app => {
  
	app.get("/api/item/:code", async (req, res) => {
		const urlCode = req.params.code;
		const item = await UrlShorten.findOne({ urlCode: urlCode });
		if (item) {
			return res.redirect(item.originalUrl);
		} else {
			return res.redirect(errorUrl);
		}
	});

	app.post("/api/item", middleware.isLoggedIn, async (req, res) => {
		const { originalUrl, shortBaseUrl } = req.body;
		if (validUrl.isUri(shortBaseUrl)) {
		} else {
		  return res
		    .status(401)
		    .json(
		      "Invalid Base Url"
		    );
		}
		const urlCode = shortid.generate();
		const updatedAt = new Date();
		if (validUrl.isUri(originalUrl)) {
		 try {
		    const item = await UrlShorten.findOne({ originalUrl: originalUrl });
		    if (item) {
		      res.status(200).json(item);
		    } else {
		      shortUrl = shortBaseUrl + "/" + urlCode;
		      const item = new UrlShorten({
		        originalUrl,
		        shortUrl,
		        urlCode,
		        updatedAt
		      });
		      await item.save();
		      await User.updateOne({ _id: req.session._id, 'urls_shortened.url_id': { $ne: item._id } }, { $addToSet: { urls_shortened: { url_id: item._id } } }, (err, updatedUser) => {
		      	if(err) {
		      		console.log(err);
		      	}
		      	console.log("User updated!");
		      })
		      res.status(200).json(item);
		    }
		  } catch (err) {
		    res.status(401).json("Invalid User Id");
		  }
		} else {
		  return res
		    .status(401)
		    .json(
		      "Invalid Original Url"
		    );
		}
	});

};