import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentsModel.js";
import JWT from 'jsonwebtoken'
import mongoose from "mongoose";

import bcrypt from "bcryptjs";
import doctorModel from "../models/doctorModel.js";

//register
export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // ✅ 🔥 ADD THIS CHECK
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // ✅ save user
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();

    res.status(201).send({
      success: true,
      message: "Register successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

// 2nd
// login 

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validations
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please add email or password",
      });
    }

    // find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // match password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    // token
    const token = JWT.sign({ id: user?._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// 3rd 
/// update user details
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'User id Not Found'
      });
    }

    const { name, phone, address, gender, dob } = req.body;

    let phototobase64 = undefined;

    // ✅ safe check
    if (req.file) {
      phototobase64 = req.file.buffer.toString('base64');
    }

    const updateData = {
      name,
      phone,
      dob,
      address,
      gender,
    };

    // ✅ only update image if exists
    if (phototobase64) {
      updateData.Image = phototobase64;
    }
await userModel.findByIdAndUpdate(
  id,
  { $set: updateData }
);

// 🔥 ALWAYS fetch fresh data
const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).send({
      success: true,
      message: 'Profile updated successfully',
      user,
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error); // 🔥 important
    res.status(500).send({
      success: false,
      message: "Something went wrong in update user api",
      error: error.message,
    });
  }
};

//// 5  password reset 
export const updatePassword = async (req, res) => {
  console.log("🔥 UPDATE PASSWORD HIT");

  try {
    const userId = req.params.id;

    // 🔐 SECURITY CHECK (important)
    if (req.user.id !== userId) {
      return res.status(403).send({
        success: false,
        message: "You can only update your own password",
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 DEBUG LOGS (keep for now)
    console.log("ENTERED OLD PASSWORD:", oldPassword);
    console.log("HASHED PASSWORD IN DB:", user.password);

    // ✅ PASSWORD MATCH
  const isMatch = await bcrypt.compare(oldPassword, user.password);
    // const isMatch = await bcrypt.compare(oldPassword, user.password);
    console.log("MATCH RESULT:", isMatch);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Incorrect old password",
      });
    }

    // 🔒 HASH NEW PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.log("UPDATE PASSWORD ERROR:", error);

    return res.status(500).send({
      success: false,
      message: "Error in update password API",
    });
  }
};

// get all user 

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({})   // ✅ plural use

    res.status(200).send({
      success: true,
      message: 'All users',
      totalCount: users.length,   // ✅ fixed
      users,                      // ✅ correct variable
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all users api",
      error,
    });
  }
}


/// get user details & Appointment details

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // check id
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide user id",
      });
    }

    // find user
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "No User found with this id",
      });
    }

    // hide password
    user.password = undefined;

    // ✅ FIXED: correct variable name + ObjectId match
    const appointments = await appointmentModel.find({
      userId: new mongoose.Types.ObjectId(id),
    });

    // response
    res.status(200).send({
      success: true,
      message: "Details Fetched Success",
      user,
      appointments, // ✅ correct name
    });

  } catch (error) {
    console.log("ERROR:", error); // 🔥 debug friendly
    res.status(500).send({
      success: false,
      message: "error in get Users Details api",
      error: error.message, // better error
    });
  }
};




////  get states
export const getStats = async (req, res) => {
  try {
    const users = await userModel.find({});
    const doctors = await doctorModel.find({});

    // ✅ Appointment count
    const totalAppointments = await appointmentModel.countDocuments();

    // ✅ Total earning
    const result = await appointmentModel.aggregate([
      {
        $group: {
          _id: null,
          totalEarning: { $sum: { $toDouble: "$amount" } },
        },
      },
    ]);

    const totalEarning = result.length > 0 ? result[0].totalEarning : 0;

    res.status(200).send({
      success: true,
      message: "All Stats",
      stats: {
        totalUsers: users.length,
        totalDoctors: doctors.length,
        totalAppointments: totalAppointments, // ✅ now correct
        totalEarning: totalEarning,           // ✅ now correct
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get stats API",
      error,
    });
  }
};

///  get login user details  with appointment details
export const getLoginUser = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id){ 
      return res.status(404).send({
        success: false,
        message: 'User id  Not Found'
      })

    }
const user = await userModel.findById(id)   // ✅ single user   // ✅ plural use
    if(!user){
      return res.status(404).send({
        success: false,
        message: 'user not found'
      })
     }
    

    res.status(200).send({
      success: true,
      message: 'login user Details',
     
      user,                      // ✅ correct variable
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all users api",
      error,
    });
  }
}