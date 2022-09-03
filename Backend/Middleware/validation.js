const { check } = require("express-validator");

module.exports = {
  PhoneNo: [
    check("phoneNo")
      .not()
      .isEmpty()
      .withMessage("Mobile Number is required")
      .custom((val) => /^[5-9]{1}[0-9]{9}$/g.test(val))
      .withMessage("Invalid phone number"),
  ],
  email: [
    check("email")
      .not()
      .isEmpty()
      .withMessage("email is required")
      .custom((val) => /^\S+@\S+\.\S+$/g.test(val))
      .withMessage("Invalid email id"),
  ],
  password: [
    check("password")
      .not()
      .isEmpty()
      .withMessage("password  is required")
      // Minimum eight and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
      .custom((val) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/g.test(
          val
        )
      )
      .withMessage("Invalid password style"),
  ],
};
