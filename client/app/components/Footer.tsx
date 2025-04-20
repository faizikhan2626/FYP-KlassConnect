import React from "react";
import Link from "next/link";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-300 dark:border-[#ffffff1c] bg-white dark:bg-gradient-to-t dark:from-gray-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Branding Section */}
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[crimson] to-[#ff6b6b] dark:from-[#37a392] dark:to-[#64ffda] bg-clip-text text-transparent">
            KlassConnect
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Bridging smart education with intelligent solutions through
            transformative learning experiences.
          </p>
          <div className="flex space-x-4 pt-2">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#ffecec] dark:hover:bg-[#2d4d48] transition-colors">
              <SiX
                className="text-gray-600 dark:text-gray-400 hover:text-[crimson] dark:hover:text-[#37a392]"
                size={18}
              />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#ffecec] dark:hover:bg-[#2d4d48] transition-colors">
              <SiLinkedin
                className="text-gray-600 dark:text-gray-400 hover:text-[crimson] dark:hover:text-[#37a392]"
                size={18}
              />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#ffecec] dark:hover:bg-[#2d4d48] transition-colors">
              <SiGithub
                className="text-gray-600 dark:text-gray-400 hover:text-[crimson] dark:hover:text-[#37a392]"
                size={18}
              />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 border-l-4 border-[crimson] dark:border-[#37a392] pl-3">
            Quick Links
          </h3>
          <nav className="space-y-2.5">
            {[
              { href: "/", label: "Home" },
              { href: "/courses", label: "Courses" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/faq", label: "FAQ" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center group text-gray-600 dark:text-gray-400 hover:text-[crimson] dark:hover:text-[#37a392] transition-colors">
                <span className="group-hover:translate-x-1 transition-transform">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Legal Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 border-l-4 border-[crimson] dark:border-[#37a392] pl-3">
            Resources
          </h3>
          <nav className="space-y-2.5">
            {[
              { href: "/blog", label: "Blog" },
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
              { href: "/docs", label: "Documentation" },
              { href: "/status", label: "System Status" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center group text-gray-600 dark:text-gray-400 hover:text-[crimson] dark:hover:text-[#37a392] transition-colors">
                <span className="group-hover:translate-x-1 transition-transform">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 border-l-4 border-[crimson] dark:border-[#37a392] pl-3">
            Contact Us
          </h3>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FiMail className="flex-shrink-0" />
              <span>support@klassconnect.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiPhone className="flex-shrink-0" />
              <span>+92 (123) 456-7890</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiMapPin className="flex-shrink-0" />
              <span>Islamabad, Pakistan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-300 dark:border-[#ffffff1c] mt-8 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2 md:mb-0">
            © {new Date().getFullYear()} KlassConnect. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/accessibility"
              className="hover:text-[crimson] dark:hover:text-[#37a392] transition-colors">
              Accessibility
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-[crimson] dark:hover:text-[#37a392] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
