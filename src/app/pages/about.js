import React from "react";

const AboutUs = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
      <p className="text-lg mb-6 text-center">
        Welcome to our website! We are a team of passionate individuals dedicated to making a positive impact. Our mission is to provide valuable resources and services that help individuals and organizations thrive in an ever-changing world.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            Our mission is to deliver high-quality products and services that meet the diverse needs of our customers. We believe in continuous improvement and always strive to exceed expectations.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg">
            Our vision is to be a leader in our industry, recognized for our innovative approach and commitment to excellence. We aim to create long-lasting relationships with our clients and contribute to the growth of our community.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <img src="team-member1.jpg" alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <p className="font-semibold">John Doe</p>
            <p>CEO & Founder</p>
          </div>
          <div className="text-center">
            <img src="team-member2.jpg" alt="Team Member 2" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <p className="font-semibold">Jane Smith</p>
            <p>COO</p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-lg">
          We would love to hear from you! If you have any questions, comments, or feedback, feel free to reach out to us. 
          <a href="mailto:contact@company.com" className="text-blue-500">Contact us</a>.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
