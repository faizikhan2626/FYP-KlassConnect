"use client";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-black dark:to-gray-900 text-black dark:text-white">
        <div className="max-w-[800px] mx-auto px-5 py-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[crimson] dark:text-[#37a392]">
            Contact Us
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            We'd love to hear from you! Reach out to us via the following:
          </p>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Email us at:{" "}
                <a
                  href="mailto:support@klassconnect.com"
                  className="text-[crimson] dark:text-[#37a392] hover:underline">
                  support@klassconnect.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                Phone
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Call us at: +92 (123) 456-7890
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                Address
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                KlassConnect, Islamabad, Pakistan
              </p>
            </div>
          </div>

          {/* Map Location */}
          <div className="mt-10">
            <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200 mb-4">
              Our Location
            </h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.1562283658536!2d73.05518941497568!3d33.68442028075738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfb23fcb0a9c75%3A0x2432156fbdc6c149!2sIslamabad%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1627315357241!5m2!1sen!2sus"
                width="100%"
                height="450"
                loading="lazy"
                className="rounded-lg"></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
