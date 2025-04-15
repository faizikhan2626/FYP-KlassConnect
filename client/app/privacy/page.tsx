"use client";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const PrivacyPolicyPage = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  return (
    <>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={5}
        route={route}
        setRoute={setRoute}
      />
      <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-black dark:to-gray-900 text-black dark:text-white">
        <div className="max-w-[800px] mx-auto px-5 py-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[crimson] dark:text-[#37a392]">
            Privacy Policy
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Effective Date: April 10, 2025
          </p>

          <div className="space-y-8">
            {/* Introduction */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Introduction
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                At KlassConnect, we value your privacy. This Privacy Policy
                outlines how we collect, use, and protect your information when
                you use our platform. By using KlassConnect, you agree to the
                terms outlined in this policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Information We Collect
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We collect various types of information to provide and improve
                our services:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Personal Information: Name, email address, and other contact
                  details.
                </li>
                <li>
                  Usage Data: Information on how you use our platform, including
                  access logs and activities.
                </li>
                <li>
                  Device Information: Information about your device, such as IP
                  address, browser type, and operating system.
                </li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                How We Use Your Information
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We use the collected information for various purposes,
                including:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Providing and improving our services and features.</li>
                <li>
                  Personalizing content and recommendations for a better user
                  experience.
                </li>
                <li>
                  Sending updates, newsletters, and other communications related
                  to our platform.
                </li>
                <li>Ensuring the security and integrity of our platform.</li>
              </ul>
            </div>

            {/* How We Protect Your Information */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                How We Protect Your Information
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We implement a variety of security measures to protect your
                personal data. This includes encryption, secure servers, and
                regular security audits to prevent unauthorized access or
                breaches.
              </p>
            </div>

            {/* Sharing Your Information */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Sharing Your Information
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We do not sell, trade, or rent your personal information to
                third parties. However, we may share your data with trusted
                service providers and partners for the following reasons:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  To operate our platform and provide services on our behalf.
                </li>
                <li>
                  To comply with legal obligations or respond to legal requests.
                </li>
                <li>
                  To protect the rights, property, or safety of KlassConnect,
                  our users, or others.
                </li>
              </ul>
            </div>

            {/* Your Rights */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Your Rights
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                You have certain rights over your personal data, including the
                right to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Access and correct the personal information we hold about you.
                </li>
                <li>
                  Request the deletion of your personal data, subject to
                  applicable legal requirements.
                </li>
                <li>Opt-out of receiving marketing communications.</li>
              </ul>
            </div>

            {/* Changes to This Policy */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Changes to This Policy
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated revision date.
                Please review this policy periodically to stay informed about
                how we are protecting your information.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Contact Us
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                If you have any questions or concerns about our Privacy Policy,
                please contact us at:
              </p>
              <ul className="space-y-2">
                <li>Email: support@klassconnect.com</li>
                <li>Phone: +92 (123) 456-7890</li>
                <li>Address: Islamabad, Pakistan</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
