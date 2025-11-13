import User from "../models/User.js";

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.deleteOne();
  res.status(200).json({ message: "User deleted successfully" });
};
