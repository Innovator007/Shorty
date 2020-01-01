const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
const config = require('./config');

const PORT = process.env.PORT || 5000;
const MONGO_URI = config.mongoUri;
const CONNECTION_OPTIONS = {
	keepAlive: true,
	reconnectTries: Number.MAX_VALUE,
	useNewUrlParser: true 
};

require('./models/UrlShorten');
require('./models/User');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URI, CONNECTION_OPTIONS, (err, db) => {
	if(err) {
		console.log("Database connection error, ", err);
	} else {
		console.log("Connected to Database!");
	}
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,x-access-token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
const db = mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
    secret: config.sessionKey,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db })
}));

require("./routes/urlshorten")(app);
require("./routes/user")(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});