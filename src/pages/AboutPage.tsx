import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
              <h1 className="text-4xl text-white font-bold mb-4 animate-slideInDown">About Us</h1>
              <nav className="flex justify-center">
                <ol className="flex space-x-2 text-white">
                  <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
                  <li><span className="mx-2">/</span></li>
                  <li className="text-blue-200">About</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h6 className="text-blue-600 font-semibold mb-2">About Us</h6>
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome to Quandax</h1>
            
            <div className="space-y-6 text-gray-700">
              <p>
                At Quandax, we're reimagining education. Our mission is to streamline the learning 
                process for K-12 students and academies, creating a seamless and integrated learning 
                environment.
              </p>
              
              <p>
                Welcome to Quandax, a unique platform that streamlines educational 
                processes for K12 students and academies, fostering an integrated environment for 
                learning, administration, and communication.
              </p>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">What Sets Us Apart:</h3>
                <p>
                  Our web-based platform brings together students, tutors, and academies. 
                  It's a one-stop solution for managing assignments, tracking progress, and 
                  facilitating effective communication.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Expanded Learning Opportunities</h3>
                <p>
                  For students, Quandax opens doors to a wider range of educational 
                  opportunities. Our student portal allows easy access to multiple academies, 
                  empowering learners to explore diverse subjects and skills.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Scalability and Adaptability</h3>
                <p>
                  Whether you're a small academy or a large educational 
                  institution, Quandax scales to your needs. Our platform is flexible and 
                  can be customized to suit various educational settings.
                </p>
              </div>

              <p className="font-semibold text-blue-600">Join us in revolutionizing education!</p>
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

export default AboutPage;