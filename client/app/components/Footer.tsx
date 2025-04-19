import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-300 dark:border-[#ffffff1c] bg-white dark:bg-gradient-to-t dark:from-gray-900 dark:to-black text-black dark:text-white">
      <div className="max-w-full mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm ">
        {/* Branding */}
        <div>
          <h2 className="text-[30px] 1000px:text-[40px] font-extrabold text-[crimson] dark:text-[#37a392] mb-4">
            KlassConnect
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Bridging smart education with intelligent solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="hover:text-[crimson] dark:hover:text-[#37a392]">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-[crimson] dark:hover:text-[#37a392]">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[crimson] dark:hover:text-[#37a392]">
                Contact
              </Link>
            </li>
            {/* Ensure the link is correctly pointing to the FAQ section */}
            <li>
              <Link
                href="faq"
                className="hover:text-[crimson] dark:hover:text-[#37a392]">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Resources
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/blog"
                className="hover:text-[crimson] dark:hover:text-[#37a392]">
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-[crimson] dark:hover:text-[#37a392]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-[crimson] dark:hover:text-[#37a392]">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Contact
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>Email: support@klassconnect.com</li>
            <li>Phone: +92 (123) 456-7890</li>
            <li>Islamabad, Pakistan</li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center py-4 text-xs border-t border-gray-300 dark:border-[#ffffff1c]">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} KlassConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
