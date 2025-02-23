"use client"; // This marks this file as a client-side component

import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../signInButton';
import LogoutButton from '../signOutButton';
import Profile from '../profile';

export default function Home() {
  const { isAuthenticated } = useAuth0();  // Destructure isAuthenticated from the Auth0 hook
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Initially set as false
  
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { label: "AI Assistant", link: "/AI-Assistant" },
    { label: "About Us", link: "/about" },
    { label: "Personal Info", link: "/personal-info" },
    { label: "Tracking", link: "/tracking" },
  ];

  // Update isLoggedIn state when authentication status changes
  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);  // This effect will run every time isAuthenticated changes

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8">
      <Auth0Provider
        domain="dev-dtie426q7e5vtlk3.us.auth0.com"
        clientId="Ys6mDeAnm2L1JGDxeUR1jcvvUSok0Okg"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <div className="absolute top-8 items-right justify-right min-h-screen bg-gray-100 p-8">
          
            <div className="grid grid-cols-1">
              <LoginButton />
              <Profile />
              <LogoutButton />
            </div>
          
        </div>
      </Auth0Provider>

      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Welcome to TrackRx!</h1>
        <p className="text-lg text-gray-600">
          A centralized tool to track your medication and symptoms.
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
                    transform: `rotate(${((index * 360) / sections.length)}deg) translate(180px) rotate(${
                      (360 - (index * 360) / sections.length)
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

        <div className="text-center mt-16">
          <ul className="mt-4 text-lg text-gray-700 grid grid-cols-3 gap-4">
            <li className="font-bold mt-4">Tracking:</li>
            <li className="font-bold mt-4">Personal Info:</li>
            <li className="font-bold mt-4">AI Assistant:</li>
            <li>Easy way to daily track medication, dosage, and time of taking as well as daily symptoms</li>
            <li>Complete the personalized experience with optional custom information to better understand your heatlh</li>
            <li>Based on your info, the AI Assistant is uniquely prepared to answer any questions at any time!</li>
          </ul>
        </div>

      </main>

      <footer className="mt-24 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} TrackRx. All rights reserved.</p>
      </footer>
    </div>
  );
}
