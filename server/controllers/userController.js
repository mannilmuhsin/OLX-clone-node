import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { bcryptPassword, checkPassword } from "../bcrypt/bcrypt.js";
import User from "../model/userModel.js";

export const checkUserLoggedIn = asyncHandler(async (req, res) => {
 
    const token = req.cookies.token;

    if (!token)
      return res.json({ loggedIn: false, error: true, message: "no token" });

    const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verifiedJWT.id, { password: 0 });
    if (!user) {
      return res.json({ loggedIn: false });
    }
    return res.json({ user, loggedIn: true });
  
});

export const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    res.json({ error: true, message: "User Already Exist" });
  } else {
    const newPassword = bcryptPassword(password);
    const newUser = new User({ name, email, password: newPassword, mobile });
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ error: false, message: "User created" });
  }
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.json({ error: true, message: "User not found" });
  } else {
    const passwordVerify = checkPassword(password, user.password);
    if (!passwordVerify) {
      res.json({ error: true, message: "credencials not matched" });
    } else {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
          sameSite: "none",
        })
        .json({
          error: false,
          user: user._id,
          name: user.name,
          message: "welcome",
        });
    }
  }
});
export const userLogout = async (req, res) => {
  res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
  }).json({ message: "logged out", error: false });
}