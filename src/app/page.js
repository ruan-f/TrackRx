"use client"; // This marks this file as a client-side component

import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook to handle routing

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    sex: '',
    weight: '',
    height: '',
    age: '',
    medicalHistory: ''
  });

  // Initialize the router
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you could add functionality to save the data, e.g., via an API call.
  };

  // State for the menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* Box Menu in the upper left corner */}
      <div className="absolute top-4 left-4">
        <button
          onClick={toggleMenu}
          className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center"
        >
          <span className="text-lg font-bold">☰</span>
        </button>
        {/* Menu items */}
        {menuOpen && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 w-48">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => router.push('/')}
                  className="w-full text-left text-gray-700 hover:text-blue-600"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/about')}
                  className="w-full text-left text-gray-700 hover:text-blue-600"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/contact')}
                  className="w-full text-left text-gray-700 hover:text-blue-600"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/tracking')}
                  className="w-full text-left text-gray-700 hover:text-blue-600"
                >
                  Tracking
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Personal Information</h1>
        <p className="text-lg text-gray-600">Please provide your details below:</p>
      </header>

      <main className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">Medical History</label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              rows="4"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </main>

      <footer className="mt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} TrackRx. All rights reserved.</p>
      </footer>
    </div>
  );
}
