import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';

const ContactPage = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {loading && (
        <div id="spinner" className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="bg-white shadow-md sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <Logo />
              </Link>
              
              <div className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                <Link to="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
                <Link 
                                    to="/login" 
                                    className="px-4 py-2 text-center text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                                  >
                                    Login
                                  </Link>
                                  <Link 
                                    to="/register" 
                                    className="px-4 py-2 text-center bg-blue-600 text-white rounded hover:bg-blue-700"
                                  >
                                    Register
                                  </Link>
              </div>

              <button className="md:hidden">
                <i className="fas fa-bars text-gray-700"></i>
              </button>
            </div>
          </div>
        </nav>

        {/* Header */}
        <div className="bg-blue-600 py-20 mb-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl text-white font-bold mb-4 animate-slideInDown">Contact</h1>
              <nav className="flex justify-center">
                <ol className="flex space-x-2 text-white">
                  <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
                  <li><span className="mx-2">/</span></li>
                  <li className="text-blue-200">Contact</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-blue-600">Contact Us</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Get In Touch</h5>
              <p className="text-gray-600 mb-8">
                We're happy to assist you! If you're searching for contact information 
                or details about Quandax's online free courses website for e-learning, please note 
                that we will get in touch with you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
                    <i className="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-semibold">Office</h5>
                    <p className="text-gray-600">123 Street, Fremont, California</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
                    <i className="fas fa-phone-alt text-white"></i>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-semibold">Mobile</h5>
                    <p className="text-gray-600">+91 8683045908</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-semibold">Email</h5>
                    <p className="text-gray-600">quandax@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded focus:outline-none focus:border-blue-600"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded focus:outline-none focus:border-blue-600"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded focus:outline-none focus:border-blue-600"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded focus:outline-none focus:border-blue-600 h-36"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-auto">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <Link to="/about" className="block text-gray-300 hover:text-white">About Us</Link>
                  <Link to="/contact" className="block text-gray-300 hover:text-white">Contact Us</Link>
                  <Link to="/privacy" className="block text-gray-300 hover:text-white">Privacy Policy</Link>
                  <Link to="/terms" className="block text-gray-300 hover:text-white">Terms & Conditions</Link>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4">Contact</h4>
                <div className="space-y-2">
                  <p><i className="fas fa-map-marker-alt mr-2"></i> 123 Street, Fremont, California</p>
                  <p><i className="fas fa-phone-alt mr-2"></i> +91 8683045908</p>
                  <p><i className="fas fa-envelope mr-2"></i> quandax@gmail.com</p>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-youtube"></i></a>
                    <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
                <p className="mb-4">Subscribe to our newsletter for updates and special offers!</p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                  />
                  <button className="absolute right-0 top-0 h-full px-4 bg-blue-600 rounded-r hover:bg-blue-700">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700">
            <div className="container mx-auto px-4 py-4">
              <p className="text-center text-gray-400">
                © 2024 Quandax. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactPage;