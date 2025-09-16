import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios"
import { backendUrl } from '../App';
import { toast } from "react-toastify";

function Add({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prise, setPrise] = useState("");
  const [categoy, setCategory] = useState("Men");
  const [seller, setSeller] = useState(false);
  const [sizes, setSizes] = useState([]);


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const fromData = new FormData()
      fromData.append("name", name);
      fromData.append("description", description);
      fromData.append("price", prise);
      fromData.append("category", categoy);
      fromData.append("bestseller", seller);
      fromData.append("sizes", JSON.stringify(sizes));

      image1 && fromData.append("image1", image1);
      image2 && fromData.append("image2", image2);
      image3 && fromData.append("image3", image3);
      image4 && fromData.append("image4", image4);


      const response = await axios.post(backendUrl + "/api/product/add", fromData, { headers: { token } });
      if (response.data) {
        toast.success(response.data.message);
        console.log(response.data);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrise('');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <form onSubmit={submitHandler} className="flex flex-col w-full items-start gap-4 p-4 sm:p-6 md:p-8 lg:p-0">
        {/* Upload Section */}
        <div className="w-full">
          <p className="text-md mb-2 text-gray-600 uppercase">Upload Image</p>
          <div className="flex flex-wrap gap-3">
            <label htmlFor="image1">
              <img
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt="upload image"
                className="cursor-pointer w-20 sm:w-24"
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt="upload image"
                className="cursor-pointer w-20 sm:w-24"
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt="upload image"
                className="cursor-pointer w-20 sm:w-24"
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt="upload image"
                className="cursor-pointer w-20 sm:w-24"
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>

        {/* Product Name */}
        <div className="w-full">
          <p className="text-md mb-2 text-gray-600 uppercase">Product Name</p>
          <input
            type="text"
            placeholder="Type Here"
            required
            className="w-full max-w-[600px] px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Product Description */}
        <div className="w-full">
          <p className="text-md mb-2 text-gray-600 uppercase">
            Product Description
          </p>
          <textarea
            placeholder="Write Content Here"
            required
            className="w-full max-w-[600px] px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Category & Price */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:w-[600px] items-center">
          <div className="w-full sm:w-1/2">
            <p className="text-sm mb-2 text-gray-600 uppercase">
              Product Category
            </p>
            <select
              className="w-full px-3 py-2"
              onChange={(e) => setCategory(e.target.value)}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="w-full sm:w-1/2">
            <p className="text-sm mb-2 text-gray-600 uppercase">
              Product Price
            </p>
            <input
              type="number"
              placeholder="25"
              className="px-3 py-2 "
              value={prise}
              onChange={(e) => setPrise(e.target.value)}
            />
          </div>
        </div>

        {/* Product Sizes */}
        <div className="w-full mt-1">
          <p className="text-sm mb-3 text-gray-600 uppercase">Product Sizes</p>
          <div className="flex flex-wrap gap-3">
            <p
              className={`${sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"} px-4 py-1 cursor-pointer`}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"]
                )
              }>
              S
            </p>

            <p
              className={`${sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"} px-4 py-1 cursor-pointer`}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"]
                )
              }>
              M
            </p>

            <p
              className={`${sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"} px-4 py-1 cursor-pointer`}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"]
                )
              }>
              L
            </p>

            <p
              className={`${sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"} px-4 py-1 cursor-pointer`}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XL")
                    ? prev.filter((item) => item !== "XL")
                    : [...prev, "XL"]
                )
              }>
              XL
            </p>

            <p
              className={`${sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"} px-4 py-1 cursor-pointer`}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"]
                )
              }>
              XXL
            </p>
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex gap-2 mt-2 items-center">
          <input type="checkbox" id="bestseller" className="cursor-pointer" onChange={(e) => setSeller(prev => !prev)} checked={seller} />
          <label htmlFor="bestseller" className="cursor-pointer">
            Add To BestSeller
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="px-4 py-2 text-md bg-black rounded-sm text-white outline-none mt-3 w-36 cursor-pointer">
          Add Product
        </button>
      </form>
    </>
  );
}

export default Add;
