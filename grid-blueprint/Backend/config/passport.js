const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5001/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile) {
          return done(new Error("No Google profile received"), null);
        }

       
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

        if (!email) {
          return done(new Error("Email not provided by Google"), null);
        }

       
        const username = profile.displayName
          ? profile.displayName.replace(/\s+/g, "_").toLowerCase()
          : email.split("@")[0];

        
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        }

        
        user = await User.findOne({ email });
        if (user) {
          user.googleId = profile.id;
          user.avatar =
            profile.photos && profile.photos.length > 0
              ? profile.photos[0].value
              : "";
          await user.save();
          return done(null, user);
        }

      
        user = await User.create({
          googleId: profile.id,
          username,
          name: profile.displayName || username,
          email,
          avatar:
            profile.photos && profile.photos.length > 0
              ? profile.photos[0].value
              : ""
        });

        return done(null, user);
      } catch (error) {
        console.error(" Google Auth Error:", error);
        return done(error, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;