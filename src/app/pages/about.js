import React, { useState } from "react";

const AboutUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-6">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-full"
      >
        &#9776;
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-10 right-4 bg-white shadow-lg rounded-md p-4 w-48">
          <ul>
            {[
              { name: "Home", link: "#/" },
              { name: "Personal Info", link: "#/personal-info" },
              { name: "AI Assistant", link: "#/AI-Assistant" },
              { name: "Tracking", link: "#/tracking" },
              { name: "About Us", link: "#/about" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.link}
                  className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>

        {/* Meet the Team */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <div className="flex justify-center gap-8">
            {["Fiona Ruan", "Tatjana Trajkovic"].map((name) => (
              <div key={name} className="text-center">
                <p className="font-semibold">{name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Motivation & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Motivation */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Motivation</h2>
            <p className="text-lg">
              As individuals who both take medication, we noticed a lack of centralized tools to keep track of everything. Managing prescriptions, remembering dosages, and keeping up with refills often felt scattered across multiple apps, notes, and reminders. We wanted a simple, intuitive solution that streamlines the process, ensuring people can focus on their well-being without the stress of medication management. That’s why we created TrackRx—to provide a reliable, all-in-one platform that makes tracking medications effortless and accessible for everyone.
            </p>
          </div>

          {/* Mission */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg">
              At TrackRx, our mission is to simplify medication management through an intuitive, centralized platform that helps users stay on top of their prescriptions, dosages, and refills with ease. We believe that managing medication—whether for physical or mental health—should be stress-free and stigma-free. By providing a seamless, reliable tool, we aim to empower individuals to take control of their health while also fostering open conversations around mental well-being.
            </p>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-8 mt-128 text-center text-gray-500 mb-8">
        <p>&copy; {new Date().getFullYear()} TrackRx. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
