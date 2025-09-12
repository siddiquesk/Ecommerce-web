import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
function Navbar() {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium">
        <Link to="/">
          <img src={assets.logo} alt="ecommerce logo" className="w-30" />
        </Link>
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p className="uppercase">Home</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p className="uppercase">Collections</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p className="uppercase">About</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p className="uppercase">Contact</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>
        <div className="flex items-center gap-7">
          <img
            src={assets.search_icon}
            alt="serach icons"
            className="w-5 cursor-pointer"
            onClick={() => setShowSearch(true)}
          />

          <div className="group relative">
            <Link to="/login">
              <img
                src={assets.profile_icon}
                alt="profile icons"
                className="w-5 cursor-pointer"
              />
            </Link>
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 bg-gray-50 text-gray-500 rounded text-center">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">My Orders</p>
                <p className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          </div>

          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="cart-icon"
              className="w-5 min-w-5"
            />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            alt="menu-icons"
            className="w-5 cursor-pointer sm:hidden"
          />
        </div>
        {/*commnet start here mobile coding here */}
        <div
          className={`absolute top-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div className="flex  items-center gap-4 p-3">
              <img
                onClick={() => setVisible(false)}
                src={assets.dropdown_icon}
                alt="logo-icon"
                className="cursor-pointer h-4 rotate-180"
              />
              <p>Back</p>
            </div>

            <div className="my-2 flex-col flex">
              <NavLink
                onClick={() => setVisible(false)}
                to="/"
                className="py-2 pl-4 border border-gray-100 mb-2  w-full"
              >
                HOME
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                to="/collection"
                className="py-2 pl-4 border border-gray-100 mb-2 w-full"
              >
                COLLECTION
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                to="/about"
                className="py-2 pl-4 border border-gray-100 mb-2 w-full"
              >
                ABOUT
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                to="/contact"
                className="py-2 pl-4 border border-gray-100 mb-2 w-full"
              >
                CONTACT
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
