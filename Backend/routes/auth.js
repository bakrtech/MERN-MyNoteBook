const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchUser");
JWT_SECRET = "ALLAH WILL PROTECT IT FROM EVIL";

//Route1 :Creating a user account No login required

router.post(
  "/createnewuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter  a valid EmailAddress").isEmail(),
    body("password", "Enter a strong Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: `Sorry a user with ${req.body.email} already exists`,
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPasswd = await bcrypt.hash(req.body.password, salt);
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPasswd,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send(`Some ERROR OCCURED AT OUR END`);
    }
  }
);
//Route 2:  Authenticating a user for login NO login required
router.post(
  "/login",
  [body("email", "Enter  a valid EmailAddress").isEmail()],
  [body("password", "It can't Be blank").exists()],
  async (req, res) => {
    // Finding errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Sorry Use the correct credintials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Sorry Use the correct credintials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = await jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send(`Some ERROR OCCURED AT OUR END`);
    }
  }
);
//Route 3: Getting User Details. Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(`Some ERROR OCCURED AT OUR END`);
  }
});
module.exports = router;
