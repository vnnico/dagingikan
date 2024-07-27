const isNotAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies["auth_token"];

    if (token) {
      return res.status(400).json({ message: "Already authenticated" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default isNotAuthenticate;
