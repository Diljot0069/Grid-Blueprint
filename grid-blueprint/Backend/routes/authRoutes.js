const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");


router.post("/login", authController.login);
router.post("/register", authController.register);


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);


router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).send("Google authentication failed");
    }

    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET
    );

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const returnUrl = new URL(`${frontendUrl}/google-success`);
    returnUrl.searchParams.set("token", token);
    if (req.user.email) returnUrl.searchParams.set("email", req.user.email);
    res.redirect(returnUrl.toString());
  }
);

module.exports = router;