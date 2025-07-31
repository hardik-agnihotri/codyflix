import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

// Serialize/deserialize logic
passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((obj: any, done) => done(null, obj));

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      return done(null, {
        providerId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        provider: profile.provider,
      });
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      return done(null, { id: profile.id, email: profile.emails?.[0].value });
    }
  )
);
