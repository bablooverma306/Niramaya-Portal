import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";

const adminSeed = {
  name: "Niramaya Admin",
  email: "admin@niramaya.local",
  password: "Admin@1234",
};

const seedAdmin = async () => {
  const existingAdmin = await userModel.findOne({ email: adminSeed.email });

  const hashedPassword = await bcrypt.hash(adminSeed.password, 10);

  if (existingAdmin) {
    if (!existingAdmin.isAdmin || !(await bcrypt.compare(adminSeed.password, existingAdmin.password))) {
      existingAdmin.name = adminSeed.name;
      existingAdmin.isAdmin = true;
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
    }

    return;
  }

  await userModel.create({
    name: adminSeed.name,
    email: adminSeed.email,
    password: hashedPassword,
    isAdmin: true,
  });
};

export { adminSeed };
export default seedAdmin;
