import User from "../models/userModel.js";

const addTocart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart successfully" });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};


const updateTocart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await User.findById(userId);
  let cartData = await userData.cartData;
    cartData[itemId][size] = quantity;
    await User.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated succefully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const getUsercart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId);
  let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export { addTocart, getUsercart, updateTocart };
