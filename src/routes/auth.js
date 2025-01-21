const express = require("express");
const passport = require("passport");
const AuthController = require("../controllers/authController");
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/send-verify-email", AuthController.sendEmailVerify);
router.get("/verify-email/:tokenVerify/:id", AuthController.verifyEmail);
router.post("/reset-password", AuthController.sendEmailResetPassword);
router.get("/user/:id", AuthController.getUserDetail);
router.post(
  "/verify-reset-password/:token/:userId",
  AuthController.verifyEmailResetPassword
);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/signin", // Redirect to login page if authentication fails
    scope: ["email", "profile"], // Define the requested scopes
  }),
  AuthController.loginGoogleCallback // Once authenticated, handle the callback
);

module.exports = router;
