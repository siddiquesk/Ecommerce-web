import React from "react";
import Title from "../component/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../component/NewsLetterBox";

function Contact() {
  return (
    <>
      <div>
        {/* CONTACT US */}
        <div className="text-center text-2xl pt-10 border-t">
          <Title text1={"CONTACT"} text2={"US"} />
        </div>

        {/* Contact Info */}
        <div className="my-10 flex flex-col md:flex-row gap-10 mb-20 px-4 md:px-0">
          <img
            src={assets.contact_img}
            alt="contact"
            className="w-full md:max-w-[480px]"
          />

          <div className="flex flex-col justify-center items-start gap-5 text-gray-600">
            <p className="font-semibold text-xl">Our Office</p>
            <p className="text-gray-500 leading-relaxed">
              51442 Wills Station <br />
              Suite 350, Washington, USA
            </p>

       

            <p className="text-gray-500 leading-relaxed">
              We are open from <strong>Monday to Friday, 9 AM – 6 PM</strong>.  
              Feel free to reach out during business hours or drop us an email anytime.
            </p>

            <p className="text-gray-500 leading-relaxed">
              You can also connect with our support team for quick queries  
              and assistance regarding our services.
            </p>

            <p className="font-semibold text-lg">Careers at Forever</p>
            <p className="text-gray-500 leading-relaxed">
              Learn more about current openings and exciting career opportunities.  
              We’re always looking for passionate people to join our growing team.
            </p>

            <button className="px-6 py-3 border border-black text-sm outline-none cursor-pointer hover:bg-black hover:text-white transition">
              Explore Jobs
            </button>
          </div>
        </div>

        {/* Newsletter */}
        <NewsLetterBox />
      </div>
    </>
  );
}

export default Contact;
