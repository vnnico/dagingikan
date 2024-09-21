import User from "../models/user.js";

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(500).json({ message: "Not Authenticated" });

  if (user.role === "admin") next();
  else return res.status(403).json({ message: "Forbidden" });
};

export default isAdmin;
