import jwt from "jsonwebtoken";
import env from "../configs/env.mjs";
import axios from "axios";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call HRIS authentication endpoint
    const response = await axios.post(`${env.HRIS_API_URL}/auth/login`, {
      email,
      password,
    });

    // Get token returned by HRIS
    const hrisToken = response.data.token;

    // Verify token locally to extract user info
    const decoded = jwt.verify(hrisToken, env.HRIS_SECRET_KEY);

    // Respond to frontend
    return res.status(200).json({
      message: "Login successful",
      token: hrisToken,
      user: decoded,
    });
  } catch (error) {
    console.error("Login failed:", error.message);

    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
};
