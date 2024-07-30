const validator = require("fastest-validator");
const v = new validator();

const Schema = {
  username: {
    type: "string",
    min: 3,
  },
  fullname: {
    type: "string",
    min: 3,
  },
  email: {
    type: "email",
  },
  password: {
    type: "string",
    min: 8,
    max: 20,
  },
  confirmPassword: {
    type: "equal",
    field: "password",
  },
  phone: {
    type: "string",
  },
};
const check = v.compile(Schema);
module.exports = check;
