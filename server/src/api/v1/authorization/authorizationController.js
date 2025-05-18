const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../../../db/model/user");
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Delivery agent not found!" });
    }

    console.log(password, user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      deliveryAgent: {
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        fullname: user.fullname,
        email: user.email,
        address: user.address,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { firstname, lastname, email, address } = req.body;
    const userId = req.user.userId;
    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists!" });
    }
    const updateData = { firstname, lastname, email };
    if (address) {
      updateData.address = address;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const token = jwt.sign(
      { userId: updatedUser._id, email: updatedUser.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      success: true,
      token,
      user: {
        userId: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        address: updatedUser.address,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        userId: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const fetchUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        isActive: user.isActive,
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Forgot Password Apis
const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: "User not found!" });

    const clientURI = `${process.env.CLIENT_URL}/account/reset/${user._id}`
    const templatePath = path.join(__dirname, '../../../templates/reset-password.ejs');
    const emailBody = await ejs.renderFile(templatePath, { clientURI, URI: process.env.CLIENT_URL });

    const mailOptions = {
      from: 'store+66037121243@t.shopifyemail.com',
      to: user.email,
      subject: 'Customer account password reset',
      html: emailBody
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return res.status(200).json({ success: true, message: "Password reset link sent successfully." })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ success: false, message: "User not found!" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = { login, signup, update, fetchUser, verifyEmail, resetPassword };
