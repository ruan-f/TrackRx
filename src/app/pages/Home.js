"use client"; // This marks this file as a client-side component

import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Home() {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { label: "AI Assistant", link: "/AI-Assistant" },
  
    { label: "Personal Info", link: "/personal-info" },
    { label: "Tracking", link: "/tracking" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Welcome to TrackRx!</h1>
        <p className="text-lg text-gray-600">
          A simple way to track your prescriptions and medication.
        </p>
      </header>

      <main className="flex flex-col items-center gap-6">

        <div className="relative mt-8">
          {/* Circular Menu Container */}
          <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-blue-600 to-purple-600 flex items-center justify-center p-4 transition-all duration-500 ease-in-out hover:scale-110">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Center Button (or info) */}
              <div className="absolute w-48 h-48 bg-white rounded-full flex items-center justify-center text-center text-blue-800 text-lg font-bold">
                TrackRx
              </div>
              {/* Menu Sections */}
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`absolute w-32 h-32 flex items-center justify-center text-white font-semibold transition-all duration-300 ease-in-out transform ${
                    activeSection === index ? "scale-125 rotate-[60deg]" : "scale-100"
                  }`}
                  style={{
                    transform: `rotate(${((index * 360) / sections.length)+30}deg) translate(180px) rotate(${
                      (360 - (index * 360) / sections.length-30)
                    }deg)`,
                  }}
                >
                  <Link
                    to={section.link}
                    className="w-full h-full flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full p-2 text-sm transition-all duration-300 ease-in-out"
                    onMouseEnter={() => setActiveSection(index)}
                    onMouseLeave={() => setActiveSection(null)}
                    style={{
                      transition: "transform 0.3s ease, background-color 0.3s ease",
                      transform: activeSection === index ? "scale(1.3)" : "scale(1)",
                      backgroundColor: activeSection === index ? "#4da8d1" : "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {section.label}
                    {activeSection === index && (
                      <div className="absolute bottom-0 bg-white text-blue-800 text-xs p-1 rounded-full mt-2">
                        {section.label}
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Features:</h2>
          <ul className="mt-4 text-lg text-gray-700">
            <li>Track your prescriptions effortlessly</li>
            <li>Instant updates on your medication status</li>
            <li>Easy-to-use interface</li>
          </ul>
        </div>

        <div className="flex gap-4 mt-8">
          <Link
            to="/about"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Learn More
          </Link>
          <Link
            to="/contact"
            className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900"
          >
            Contact Us
          </Link>
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} TrackRx. All rights reserved.</p>
      </footer>
    </div>
  );
}
