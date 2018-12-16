const passport = require("passport");
const LocalStrategy = require("./localStrategyAdmin");
const admin = require("../database/models/admin");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((admin, done) => {
  console.log("*** serializeUser called, user: ");
  console.log(user); // the whole raw user object!
  console.log("---------");
  done(null, { _id: admin._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  console.log("DeserializeUser called");
  Admin.findOne({ _id: id }, "username", (err, user) => {
    done(null, admin);
  });
});

//  Use Strategies
passport.use(LocalStrategy);
module.exports = passportAdmin;
