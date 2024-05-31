const users_Models = require("../models/users_Models");

const bcrypt = require("bcryptjs");

const express = require("express");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const hashPassword = bcrypt.hashSync(password);

    const user = new users_Models({ email, password: hashPassword, username });
    await user.save().then(() => {
      return res.status(200).json({ message: "User created successfully" });
    });
  } catch (error) {
    res.status(200).json({ message: "user Already Exists!" });
  }
});
router.post("/signin", async (req, res) => {
  try {
    const user = await users_Models.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Please Sign up First!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
