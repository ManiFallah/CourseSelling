const validator = require("fastest-validator");
const v = new validator();
const schema = {
  email: {
    type: "email",
  },
};
const check = v.compile(schema);
module.exports = check;
