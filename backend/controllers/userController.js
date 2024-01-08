import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import fs from "fs";
import path from "path";

// @desc    Register a new user
// route    POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user?.isActive == false) {
    res.status(400);
    throw new Error("This account is inactive");
  }

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.profile_image,
      isActive: user.isActive,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({ message: "Auth User" });
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", " ", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Logged Out" });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// ADMIN ROUTE
// @desc    Get all users profile
// route    GET /api/users/profileAll
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updatetUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
      image: updatedUser.profile_image,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user._id);
});

// @desc    Update user profile image
// route    PUT /api/users/profile
// @access  Private
const updatetUserProfileImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.profile_image = req.file.filename || user.profile_image;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
      image: updatedUser.profile_image,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// ADMIN ROUTE
// @desc    Delete user profile
// route    DELETE /api/users/profile/delete
// @access  Private
const deleteAUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  //console.log(userId);
  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.deleteOne();

  res.status(200).json(user._id);
});

// ADMIN ROUTE
// @desc    Soft Delete user profile
// route    PUT /api/users/profile/soft-delete
// @access  Private
const softDeleteAUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isActive == true) {
    const updatedUser = await User.findByIdAndUpdate(id, {
      isActive: false,
    });
    res.status(200).json(updatedUser.isActive);
  } else if (user.isActive == false) {
    const updatedUser = await User.findByIdAndUpdate(id, {
      isActive: true,
    });
    res.status(200).json(updatedUser.isActive);
  } else {
    res.status(500);
    throw new Error("server error");
  }
});

// ADMIN ROUTE
// @desc    GET user profile
// route    GET /api/users/profile/single/:id
// @access  Private
const getUserFromAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    name: user.name,
    email: user.email,
    image: user.profile_image,
  });
});

// ADMIN ROUTE
// @desc    UPDATE user profile
// route    UPDATE /api/users/profile/updatesingle
// @access  Private
const updateSingleAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

async function fetchAccessToken() {
  try {
    const body = {
      username: "admin",
      password: "admin931",
      provider: "db",
      refresh: true,
    };

    const response = await fetch(
      "https://superset.acruxtek.net/api/v1/security/login",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const jsonResponse = await response.json();
    //console.log("jsnosss response", jsonResponse);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch access token. Status: ${response.status}`
      );
    }

    return jsonResponse?.access_token;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching access token");
  }
}

async function getCsrfToken(accessToken) {
  try {
    const response = await fetch(
      "https://superset.acruxtek.net/api/v1/security/csrf_token/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const jsonResponse = await response.json();
    //console.log("jsnosss response csrf: ", response.headers.get("set-cookie"));

    const responseFinal = {
      csrf: jsonResponse.result,
      ckie: response.headers.get("set-cookie"),
    };

    //console.log("response final", responseFinal);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch access token. Status: ${response.status}`
      );
    }

    return responseFinal;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching access token");
  }
}

async function fetchGuestToken() {
  const accessToken = await fetchAccessToken();
  const csrfToken = await getCsrfToken(accessToken);
  //console.log("token recieved access:", accessToken);
  //console.log("token recieved csrf: ", csrfToken);
  try {
    const body = {
      resources: [
        {
          type: "dashboard",
          id: "a2bf6189-3c5e-446f-bb93-555bfba93d94",
        },
      ],
      rls: [],
      user: {
        username: "guest",
        first_name: "Guest",
        last_name: "User",
      },
    };

    const bodyString = JSON.stringify(body);

    const response = await fetch(
      "https://superset.acruxtek.net/api/v1/security/guest_token/",
      {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type": "application/json",
          //"Content-Length": Buffer.byteLength(bodyString),
          Authorization: `Bearer ${accessToken}`,
          "X-CSRF-TOKEN": csrfToken.csrf,
          Cookie: csrfToken.ckie,
        },
      }
    );

    const jsonResponse = await response.json();

    //console.log("guest token responseeee", jsonResponse);

    const responseFinal = {
      token: jsonResponse?.token,
      ckie: response.headers.get("set-cookie"),
      csrfToken: csrfToken.csrf,
    };

    //console.log("csrf", csrfToken.ckie);
    //console.log("guest", responseFinal.ckie);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch guest token. Status: ${response.status}`
      );
    }

    return responseFinal;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching guest token");
  }
}

const getGuestToken = asyncHandler(async (req, res) => {
  try {
    const resp = await fetchGuestToken();

    if (resp?.ckie) {
      // Use res.cookie to set the cookie in the response
      res.cookie("XSRF-TOKEN", resp?.ckie, {
        secure: true,
      });
      //Sres.cookie("session", resp?.ckie);
      res.setHeader("X-CSRF-TOKEN", resp?.ckie);
    }

    console.log("guest token responseeee", resp);

    res.status(200).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export {
  getGuestToken,
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updatetUserProfile,
  updatetUserProfileImage,
  getAllUsers,
  getUserFromAdmin,
  deleteAUser,
  softDeleteAUser,
  updateSingleAdmin,
};
