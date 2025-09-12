import React from 'react'
import { assets } from './../assets/assets';

function Footer() {
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10 mt-40 text-sm">
          {/* Logo & Description */}
          <div>
            <img src={assets.logo} alt="logo" className="w-32 mb-5" />
            <p className="w-full md:w-4/5 text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-xl font-medium mb-3">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>HOME</li>
              <li>ABOUT</li>
              <li>CONTACT</li>
              <li>DELIVERY</li>
              <li>PRIVACY</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-xl font-medium mb-3">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>+91-9769285713</li>
              <li>sufiyansiddique078@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div>
          <p className="py-5 text-sm text-center">
            Copyright 2024 @ greatstack.dev - All Right Reserved.
          </p>
        </div>
      </div>

    </>
  )
}

export default Footer