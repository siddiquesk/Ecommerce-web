import jwt from "jsonwebtoken";

const authCart = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded._id || decoded.id;

    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default authCart;
