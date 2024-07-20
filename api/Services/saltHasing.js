const { Salt } = require("../Constants/Salt");
const { createHmac } = require("crypto");

function saltHashing(password) {
  const pswd = password;
  const hashedPassword = createHmac("sha256", Salt).update(pswd).digest("hex");

  return hashedPassword;
}

module.exports = { saltHashing };
