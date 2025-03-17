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
router.post("/change-password/:id/:token", AuthController.changePassword);
router.post(
  "/change-password-by-old-password",
  AuthController.changePasswordByOldPassword
);

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
    failureRedirect: "http://localhost:5173/signin",
    scope: ["email", "profile"],
  }),
  AuthController.loginGoogleCallback
);

module.exports = router;
