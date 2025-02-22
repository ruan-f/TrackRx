"use client"; // This ensures that this page uses client-side rendering

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router's useNavigate for navigation

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    sex: "",
    weight: "",
    height: "",
    age: "",
    medicalHistory: "",
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // You could send this form data to an API here, or store it in local state
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Function to toggle the menu

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-full"
      >
        &#9776; {/* This is the hamburger icon */}
      </button>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-10 right-4 bg-white shadow-lg rounded-md p-4 w-48">
          <ul>
            <li>
              <a
                href="#/"
                className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
              >
                Home
              </a>
            </li>
            <button>
              {/* Personal Info Link - Disable navigation */}
              <a
                href="#/personal-info"
                className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
              >
                Personal Info
              </a>
            </button>
            {/* Add other menu items here */}
            <li>
              <a
                href="#/about"
                className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#/contact"
                className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Personal Information</h1>
        <p className="text-lg text-gray-600">Please provide your details below:</p>
      </header>

      <main className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="sex" className="block text-gray-700">Sex:</label>
            <select
              name="sex"
              id="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="weight" className="block text-gray-700">Weight (kg):</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="height" className="block text-gray-700">Height (cm):</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="medicalHistory" className="block text-gray-700">Medical History:</label>
            <textarea
              name="medicalHistory"
              id="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-full"
            >
              Save Info
            </button>

          </div>
        </form>
      </main>
    </div>
  );
}
