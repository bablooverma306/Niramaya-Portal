import doctorModel from "../models/doctorModel.js";

const placeholderDoctorImage =
  "iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAIAAAD1n3hGAAABnElEQVR4nO3cQW7DIBAF0cP9f2XbQZxgQx8y2Gm1yQmQm3nQx2dVw3wJ4J9u2QAAAAAAAAAAAAAAAAAAAAAAAL8F2u4m9Q5Kk2o1Y2o4Z8f3m5n7yY3X6b5V9K8m9w9m3gJcQm8k7tQm8m3c3bF4u7n2m9W6b0vZ1k6w1mN7m3hG3l5gQm3m9bJ1e1vWm0xg7m5m1m6kX0n6d9m3g2mY0m8n0mQ6x8m8m6c3m9n3mQ2m9l5q0m8y2m8p7t0n0mQAAAAAAAAAAAAAAAAAAAAAAAPwN7A6p1fY3VgL6AAAAAElFTkSuQmCC";

const seedDoctors = async () => {
  const count = await doctorModel.countDocuments();

  if (count > 0) {
    return;
  }

  const doctors = [
    {
      name: "Dr. Aarav Kumar",
      degree: "MBBS, BDS",
      speciality: "Dentist",
      experince: 5,
      fees: "200",
      email: "aarav.kumar@niramaya.local",
      about: "Expert in cosmetic dentistry and smile designing.",
      gender: "Male",
      phone: "9000000001",
      address: "Delhi, India",
      dob: "1990-01-01",
      Image: placeholderDoctorImage,
      available: true,
    },
    {
      name: "Dr. Neha Patel",
      degree: "MBBS, MD",
      speciality: "Cardiologist",
      experince: 4,
      fees: "250",
      email: "neha.patel@niramaya.local",
      about: "Heart specialist with experience in ECG and angiography.",
      gender: "Female",
      phone: "9000000002",
      address: "Mumbai, India",
      dob: "1989-02-02",
      Image: placeholderDoctorImage,
      available: true,
    },
    {
      name: "Dr. Rohan Gupta",
      degree: "MBBS, DM",
      speciality: "Neurologist",
      experince: 6,
      fees: "300",
      email: "rohan.gupta@niramaya.local",
      about: "Brain and nerve specialist for migraine and stroke care.",
      gender: "Male",
      phone: "9000000003",
      address: "Pune, India",
      dob: "1988-03-03",
      Image: placeholderDoctorImage,
      available: true,
    },
    {
      name: "Dr. Priya Verma",
      degree: "MBBS, DDVL",
      speciality: "Dermatologist",
      experince: 3,
      fees: "220",
      email: "priya.verma@niramaya.local",
      about: "Skin, hair and cosmetic treatment expert.",
      gender: "Female",
      phone: "9000000004",
      address: "Lucknow, India",
      dob: "1991-04-04",
      Image: placeholderDoctorImage,
      available: true,
    },
  ];

  await doctorModel.insertMany(doctors);
};

export default seedDoctors;
