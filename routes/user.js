const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = app => {
  
	app.post('/api/signup', async (req, res) => {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		return res.status(200).json(newUser);
	});

	app.post('/api/login', async (req, res) => {
		const { email, password } = req.body;
	  	if (!email || !password) {
	    	return res.status(401).json({ message: "Please provide email and password!" });
	  	}
	  	const user = await User.findOne({ email }).select('+password');

	  	if (!user || !(await user.correctPassword(password, user.password))) {
	    	return res.status(401).json({ message: "Incorrect email or password!" });
	  	}
	  	req.session._id = user._id;
	  	return res.status(200).json(user);
	});

	app.get('/api/currentUser', (req, res)=> {
        if (req.session._id) {
            User.findOne({_id: req.session._id})
            .then(result => {
                return res.status(200).json(result);
            }).catch(err => {
                console.log(err);
                return res.status(403).json({});
            });
        } else {
            console.log('Session values are not present');
            return res.status(403).json({});
        }

    });

};