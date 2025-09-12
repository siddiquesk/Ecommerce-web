import React from "react";
import Title from "../component/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../component/NewsLetterBox";

function About() {
  return (
    <>
      <div>
        {/* ABOUT US */}
        <div className="text-2xl text-center pt-8 border-t">
          <Title text1={"ABOUT"} text2={"US"} />
        </div>

        <div className="my-10 flex flex-col md:flex-row gap-10 md:gap-16 px-4 md:px-0">
          <img
            src={assets.about_img}
            alt="about"
            className="w-full md:max-w-[450px]"
          />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <p>
              We are a dedicated team focused on delivering high-quality
              solutions that bring value to our clients. Our goal is to combine
              creativity, innovation, and expertise to achieve meaningful
              results.
            </p>
            <p>
              Over the years, we have built trust by maintaining transparency,
              reliability, and a commitment to excellence. We believe in
              long-term relationships with our clients through consistent
              performance and support.
            </p>
            <b className="text-gray-800">Our Mission</b>
            <p>
              Our mission is to empower businesses and individuals with modern,
              effective, and user-friendly solutions that drive growth and make
              an impact in today’s competitive world.
            </p>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="text-2xl py-4 text-center">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>

        <div className="flex flex-col md:flex-row text-sm mb-20 gap-6 px-4 md:px-0">
          <div className="border border-gray-300 px-6 sm:px-10 md:px-12 py-8 flex flex-col gap-4">
            <b className="text-lg sm:text-xl text-gray-800">Quality Assurance</b>
            <p>
              We ensure every project is handled with care and attention to
              detail, maintaining the highest standards of quality and
              reliability.
            </p>
          </div>
          <div className="border border-gray-300 px-6 sm:px-10 md:px-12 py-8 flex flex-col gap-4">
            <b className="text-lg sm:text-xl text-gray-800">Convenience</b>
            <p>
              Our processes are simple and client-friendly, designed to save
              time and deliver a seamless experience across all platforms.
            </p>
          </div>
          <div className="border border-gray-300 px-6 sm:px-10 md:px-12 py-8 flex flex-col gap-4">
            <b className="text-lg sm:text-xl text-gray-800">
              Exceptional Customer Service
            </b>
            <p>
              We pride ourselves on providing dedicated support and
              communication, ensuring clients feel valued and supported at every
              step.
            </p>
          </div>
        </div>

        <NewsLetterBox />
      </div>
    </>
  );
}

export default About;
