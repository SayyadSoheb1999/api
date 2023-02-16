const router = require("express").Router();
const bcrypt = require("bcrypt");
const { findOne } = require("../modals/User");

const User = require("../modals/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });
    const user = await newUser.save();
    // res.status(200).json(user);
    res.status(200).json(req.body);
  } catch (error) {
    console.log("Error");
    res.status(500).json(error);
  }
});

//  LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // if (user) {
    //   res.status(400).json("already has user with this name");
    // } else {
    // }
    !user && res.status(400).json("wrong credintials!");

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("wrong password!");
    //   if(validate){
    //     res.status(200).json("you can login now !")
    //   }else{
    //     !user && res.status(400).json("wrong credintials!"); }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (arr) {
    console.log("in login ", err);
  }
});

module.exports = router;
