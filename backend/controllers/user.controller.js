import User from "../models/user.model.js";
import Url from "../models/url.model.js";
import bcrypt from "bcryptjs";
import { customAlphabet } from "nanoid";
import { generateToken } from "../config/token.js";
import redisClient from "../config/redis.js";
import fs from "fs";
import dotenv from "dotenv";
import uploadOnCloudinary from "../config/cloudinary.js";
dotenv.config();

const getPublicShortBaseUrl = () =>
  (
    process.env.PROD_BASE_URL ||
    process.env.DEV_BASE_URL ||
    "http://localhost:5173"
  ).replace(/\/$/, "");

const sanitizeUser = (user) => {
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // true in production with HTTPS
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      user: sanitizeUser(user),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "User created successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUserUrls = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const urls = await Url.find({ userId });
    res.status(200).json({ urls });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { username, email, password } = req.body;

    const updateData = {};

    if (username) {
      const existingUsername = await User.findOne({
        username,
        _id: { $ne: userId },
      });

      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }

      updateData.username = username;
    }

    if (email) {
      const existingEmail = await User.findOne({ email, _id: { $ne: userId } });

      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      updateData.email = email;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    if (req.file) {
      if (req.file) {
        console.log("Uploaded file:", req.file);
        console.log("File path:", req.file.path);
        console.log("File exists:", fs.existsSync(req.file.path));

        const cloudinaryUrl = await uploadOnCloudinary(req.file.path);

        if (cloudinaryUrl) {
          updateData.photoUrl = cloudinaryUrl;
        }
      } else {
        return res
          .status(500)
          .json({ message: "Failed to upload image to cloud storage" });
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message:
          "At least one field (username, email, password, or photo) is required to update",
      });
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,

      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",

      user: sanitizeUser(user),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const shortenUrl = async (req, res) => {
  try {
    const userId = req.user.id;
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "Original URL is required" });
    }

    const urlCode = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      6,
    )();

    const url = await Url.create({
      originalUrl,
      shortUrl: urlCode,
      userId,
    });

    res.status(201).json({
      message: "URL shortened successfully",
      shortUrl: `${getPublicShortBaseUrl()}/${urlCode}`,
      url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const createCustomAlias = async (req, res) => {
  try {
    const userId = req.user.id;
    const { originalUrl, customAlias } = req.body;

    if (!originalUrl || !customAlias) {
      return res
        .status(400)
        .json({ message: "Original URL and custom alias are required" });
    }

    if (customAlias.length < 4 || customAlias.length > 8) {
      return res
        .status(400)
        .json({ message: "Custom alias must be between 4 and 8 characters" });
    }

    const alias = customAlias.toLowerCase();
    const existingAlias = await Url.findOne({ shortUrl: alias });

    if (existingAlias) {
      return res.status(400).json({ message: "Custom alias already exists" });
    }

    const url = await Url.create({
      originalUrl,
      shortUrl: alias,
      userId,
    });

    res.status(201).json({
      message: "Custom alias created successfully",
      shortUrl: `${getPublicShortBaseUrl()}/${alias}`,
      url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const cachedUrl = await redisClient.get(shortUrl);

    if (cachedUrl) {
      console.log("Redis cache hit");

      await Url.findOneAndUpdate(
        { shortUrl },
        {
          $inc: { clicks: 1 },
          lastVisited: new Date(),

          $push: {
            visitHistory: {
              ip: req.ip,
              userAgent: req.headers["user-agent"],
              referrer: req.headers.referer || "direct",
            },
          },
        },
      );

      return res.render("redirect", {
        originalUrl: cachedUrl,
      });
    }

    const url = await Url.findOneAndUpdate(
      { shortUrl },
      {
        $inc: { clicks: 1 },
        lastVisited: new Date(),

        $push: {
          visitHistory: {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            referrer: req.headers.referer || "direct",
          },
        },
      },
      { new: true },
    );

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    await redisClient.set(shortUrl, url.originalUrl, {
      EX: 60 * 60 * 24,
    });

    console.log("MongoDB hit");

    res.render("redirect", {
      originalUrl: url.originalUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const urlId = req.params.urlId;
    const userId = req.user.id;

    const url = await Url.findOne({ _id: urlId, userId });

    if (!url) {
      return res
        .status(404)
        .json({ message: "URL not found or unauthorized to delete" });
    }

    await Url.findByIdAndDelete(urlId);
    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Url.deleteMany({ userId });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getDashboardMetrics = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalUrls = await Url.countDocuments({ userId });

    const totalClicksResult = await Url.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $group: {
          _id: null,
          totalClicks: {
            $sum: "$clicks",
          },
        },
      },
    ]);

    const topUrls = await Url.find({ userId }).sort({ clicks: -1 }).limit(5);

    const recentUrls = await Url.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalUrls,
      totalClicks: totalClicksResult[0]?.totalClicks || 0,
      topUrls,
      recentUrls,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
