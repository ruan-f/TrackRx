// pages/personal-info.js
"use client"; // This ensures that this page uses client-side rendering

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook for navigation

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    sex: "",
    weight: "",
    height: "",
    age: "",
    medicalHistory: "",
  });

  const router = useRouter(); // Initialize the router

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <header className="mb-8 text-center">
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

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-full"
            >
              Save Info
            </button>

            <button
              type="button"
              onClick={() => router.push('/')} // Navigate back to home when clicked
              className="px-6 py-2 bg-gray-600 text-white rounded-full"
            >
              Back to Home
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
