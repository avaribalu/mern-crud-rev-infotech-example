const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

// Define adminSchema
const adminSchema = new Schema({
  username: { type: String, unique: false, required: false },
  password: { type: String, unique: false, required: false },
  type: { type: String, unique: false, required: false }
});

// Define schema methods
adminSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
adminSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("models/admin.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/admin.js hashPassword in pre save");
    this.password = this.hashPassword(this.password);
    next();
  }
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
