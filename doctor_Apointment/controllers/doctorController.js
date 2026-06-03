import doctorModel from "../models/doctorModel.js";

// 2 add doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      degree,
      fees,
      about,
      gender,
      phone,
      address,
      speciality,
      experince,
      dob,
      email,
    } = req.body;

    if (
      !name ||
      !email ||
      !degree ||
      !fees ||
      !about ||
      !gender ||
      !phone ||
      !address ||
      !speciality ||
      !experince ||
      !dob
    ) {
      return res.status(400).send({
        success: false,
        message: "please provide all fields",
      });
    }

    console.log(req.body);
    console.log(req.file);

  const photoBase64 = req.file ? req.file.buffer.toString("base64") : null;

    const doctorData = {
      name,
      email,
      fees,
      about,
      phone,
      gender,
      address,
      speciality,
      Image: photoBase64,
      experince,
      degree,
      dob,
    };

    const doctor = new doctorModel(doctorData);
    await doctor.save();

    res.status(201).send({
      success: true,
      message: "Doctor Created",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in doctor api",
      error,
    });
  }
};

// 3 get all doctor
export const getAllDoctor = async (req, res) => {
  try {

// ✅ Sahi
const doctor = await doctorModel.find();
    res.status(200).send({
      success: true,
      message: "all doctor list",
      totalCount: doctor.length,
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all doctor api",
      error,
    });
  }
};

// 4 get doctor details
export const getDoctorDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: "please add doctor id",
      });
    }

    const doctor = await doctorModel.findById(id);

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "No doctor found with this id",
      });
    }

    res.status(200).send({
      success: true,
      message: "details fetched successfully",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get doctor details api",
      error,
    });
  }
};

// update doctor
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: "please add doctor id",
      });
    }

    const data = req.body;

    // image update support
    if (req.file) {
      data.Image = req.file.buffer.toString("base64");
    }

    const doctor = await doctorModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "doctor details updated",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update api",
      error,
    });
  }
};

// 5 delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: "please add doctor id",
      });
    }

    await doctorModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "doctor has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete api",
      error,
    });
  }
};

// update available status
export const updateAvailableStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: "please add doctor id",
      });
    }

    const { available } = req.body;

    if (available === undefined) {
      return res.status(400).send({
        success: false,
        message: "please provide available status",
      });
    }

    const doctor = await doctorModel.findByIdAndUpdate(
      id,
      { $set: { available } },
      { new: true }
    );
    

    res.status(200).send({
      success: true,
      message: "Doctor Available Status has been Updated",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update Available doctor api",
      error,
    });
  }
};
