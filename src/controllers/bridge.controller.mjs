import { Bridge } from "../models/index.model.mjs";

export const createBridge = async (req, res) => {
  try {
    const { examiner_id, quiz_id, result_id } = req.body;

    const bridge = await Bridge.create({
      examiner_id,
      quiz_id,
      result_id,
    });

    res
      .status(201)
      .json({ message: "Bridge created successfully", data: bridge });
  } catch (error) {
    console.error("Error creating bridge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
