const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		default: "your-name"
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false
	},
	urls_shortened: [{
		url_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UrlShorten"
		}
	}]
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword,userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

mongoose.model("User", userSchema);