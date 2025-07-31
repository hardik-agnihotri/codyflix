import express from 'express';
import { createProfile, getProfile, login, oauthCallback, register, testCheck } from '../controllers/authControllers';
import { protect } from '../middleware/authMiddleware';
import passport from 'passport';
import { profile } from 'console';

const router = express.Router();

router.post("/register",register);
router.post("/login",login);


// Google & Github Routes

// GOOGLE
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  oauthCallback 
);

// GITHUB
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth" }),
  oauthCallback
);

// route to fetch user profile which will be protected

router.get("/profile",protect,getProfile)

router.post("/profile",protect,createProfile)

// ---------------------

// Test Route for Protect routes
router.get("/test",protect,testCheck);
export default router