const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("./config/passport"); 

const app = express();


app.use(cors());
app.use(express.json());

app.use(passport.initialize());


const seedDefaultUser = async () => {
  try {
    const email = "singhdiljot175@gmail.com";
    const existing = await User.findOne({ email });
    const hashed = await bcrypt.hash("diljot@12345", 10);

    if (existing) {
      if (!existing.password) {
        existing.password = hashed;
        await existing.save();
        console.log("Default user's password set for existing Google user:", email);
      }
      return;
    }

    await User.create({
      username: "diljot",
      email,
      password: hashed,
      name: "Diljot Singh"
    });
    console.log("Default user created:", email);
  } catch (err) {
    console.error("Failed to seed default user:", err);
  }
};

connectDB().then(seedDefaultUser);


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

app.get("/", (req, res) => {
  res.send("API Running ");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));