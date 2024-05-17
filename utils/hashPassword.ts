// hashPassword.js

import bcrypt from "bcrypt";

const hashPassword = async (password: any) => {
  try {
    // Sử dụng bcrypt để băm mật khẩu với hash là 10
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
};

export default hashPassword;
