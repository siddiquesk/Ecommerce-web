import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";

// Add Product Controller
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, bestseller } = req.body;

    // Handle uploaded images
    const imageFields = ["image1", "image2", "image3", "image4"];
    const images = imageFields
      .map((field) => req.files[field]?.[0]) // ?. safe check
      .filter((file) => file !== undefined);

    // Upload to Cloudinary
    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Prepare product data
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      bestseller: bestseller === "true", // converts string → boolean
      sizes: JSON.parse(sizes), // sizes must come as JSON string from frontend
      image: imageUrls,
      date: Date.now(),
    };

    // Save to DB
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    // ✅ Success response
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("❌ Error in addProduct:", error.message);

    // ❌ Error response
    return res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

//list products
const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({   // <-- status code fix
      success: true,
      products
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


//remove products
const removeProduct = async (req, res) => {
  try {
     await Product.findByIdAndDelete(req.body.id);
     return res.json({success:true,message:'Product removed Successfully'});
  } catch (err) {
     return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//single products
const singleProduct = async (req, res) => {
  try {
    const {productId}=req.body;
    const product =await Product.findById(productId);
    res.json({success:true,product}); 
  } catch (err) {
     return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export {addProduct, singleProduct, removeProduct,listProduct, };
