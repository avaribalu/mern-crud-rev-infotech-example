
const Admin = require('../database/models/admin')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy({
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		Admin.findOne({ username: username }, (err, admin) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, admin)
		})
	}
)

module.exports = strategyAdmin
