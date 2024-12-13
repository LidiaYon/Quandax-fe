// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Logo } from '../components/common/Logo';

// const StartPage = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate initial loading
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       {/* Initial Loading Spinner */}
//       {loading && (
//         <div id="spinner"
//           className="fixed inset-0 bg-white flex items-center justify-center z-50">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600">
//             <span className="sr-only">Loading...</span>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="min-h-screen flex flex-col">
//         {/* Navbar */}
//         <nav className="bg-white shadow-md sticky top-0 z-40">
//           <div className="container mx-auto px-4">
//             <div className="flex justify-between items-center h-16">
//               <Link to="/" className="flex items-center space-x-2">
//                 <Logo />
//                 <span className="text-2xl font-bold text-blue-600">Quandax</span>
//               </Link>
              
//               <div className="hidden md:flex space-x-8">
//                 <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
//                 <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
//                 <Link to="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
//                 <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
//                 <Link to="/login" className="text-gray-700 hover:text-blue-600">
//                   <i className="fas fa-user"></i>
//                 </Link>
//               </div>

//               <button className="md:hidden">
//                 <i className="fas fa-bars text-gray-700"></i>
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <div className="relative bg-cover bg-center h-[600px]" style={{
//           backgroundImage: "url('/img/carousel-1.jpg')"
//         }}>
//           <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center">
//             <div className="container mx-auto px-4">
//               <div className="max-w-2xl">
//                 <h5 className="text-blue-300 text-lg uppercase mb-4 animate-fadeIn">
//                   Best E-learning Platform
//                 </h5>
//                 <h1 className="text-white text-5xl font-bold mb-6 animate-slideDown">
//                   Transform Your Learning Journey With Quandax
//                 </h1>
//                 <p className="text-white text-xl mb-8">
//                   Access expert tutoring, interactive courses, and personalized learning paths designed for your success.
//                 </p>
//                 <div className="space-x-4">
//                   <Link to="/about" className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition">
//                     Read More
//                   </Link>
//                   <Link to="/signup" className="bg-white text-gray-800 px-8 py-3 rounded hover:bg-gray-100 transition">
//                     Join Now
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h1 className="text-3xl font-bold text-blue-600 mb-4">
//                 Advance in your academy with Quandax
//               </h1>
//               <p className="text-gray-600">
//                 Learn from the best! Get access to tons of cool courses, projects, and more, taught by expert teachers.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//               {[
//                 {
//                   icon: "icon1.png",
//                   title: "Learn anything",
//                   desc: "Explore any interest or trending topic, take prerequisites, and advance your skills"
//                 },
//                 {
//                   icon: "icon2.png",
//                   title: "Save money",
//                   desc: "Spend less money on your learning if you plan to take multiple courses this year"
//                 },
//                 {
//                   icon: "icon3.png",
//                   title: "Flexible learning",
//                   desc: "Learn at your own pace, move between multiple courses, or switch to a different course"
//                 },
//                 {
//                   icon: "icon4.png",
//                   title: "Unlimited certificates",
//                   desc: "Earn a certificate for every learning program that you complete at no additional cost"
//                 }
//               ].map((feature, index) => (
//                 <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
//                   <img src={`/img/${feature.icon}`} alt="" className="w-16 h-16 mx-auto mb-4"/>
//                   <h5 className="text-xl font-semibold mb-3">{feature.title}</h5>
//                   <p className="text-gray-600">{feature.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Popular Courses Section */}
//         <div className="py-16 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h6 className="text-blue-600 font-semibold mb-2">Popular Courses</h6>
//               <h1 className="text-3xl font-bold text-blue-600">
//                 Explore new and trending free online courses
//               </h1>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               {/* Course cards would go here - simplified for brevity */}
//             </div>

//             <div className="text-center mt-12">
//               <Link to="/courses" className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition">
//                 All Courses
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className="bg-gray-800 text-white mt-auto">
//           <div className="container mx-auto px-4 py-12">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div>
//                 <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
//                 <div className="space-y-2">
//                   <Link to="/about" className="block text-gray-300 hover:text-white">About Us</Link>
//                   <Link to="/contact" className="block text-gray-300 hover:text-white">Contact Us</Link>
//                   <Link to="/privacy" className="block text-gray-300 hover:text-white">Privacy Policy</Link>
//                   <Link to="/terms" className="block text-gray-300 hover:text-white">Terms & Conditions</Link>
//                 </div>
//               </div>
              
//               <div>
//                 <h4 className="text-xl font-semibold mb-4">Contact</h4>
//                 <div className="space-y-2">
//                   <p><i className="fas fa-map-marker-alt mr-2"></i> 123 Street, Fremont, California</p>
//                   <p><i className="fas fa-phone-alt mr-2"></i> +91 8683045908</p>
//                   <p><i className="fas fa-envelope mr-2"></i> quandax@gmail.com</p>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
//                 <p className="mb-4">Subscribe to our newsletter for updates and special offers!</p>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     placeholder="Your email"
//                     className="w-full px-4 py-2 rounded bg-gray-700 text-white"
//                   />
//                   <button className="absolute right-0 top-0 h-full px-4 bg-blue-600 rounded-r hover:bg-blue-700">
//                     Subscribe
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-700">
//             <div className="container mx-auto px-4 py-4">
//               <p className="text-center text-gray-400">
//                 © 2024 Quandax. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default StartPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';

// Import images from assets
import carouselImage from '../assets/carousel-1.jpg';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';

const StartPage = () => {
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
        <div id="spinner"
          className="fixed inset-0 bg-white flex items-center justify-center z-50">
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
              
              <div className="hidden md:flex items-center space-x-8">
                <div className="flex space-x-8">
                  <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                  <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                  <Link to="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
                  <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              </div>

              <button className="md:hidden">
                <i className="fas fa-bars text-gray-700"></i>
              </button>

              {/* Mobile menu */}
              <div className="md:hidden absolute top-16 right-0 left-0 bg-white shadow-md p-4 hidden">
                <div className="flex flex-col space-y-4">
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
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div 
          className="relative bg-cover bg-center h-[600px]" 
          style={{
            backgroundImage: `url(${carouselImage})`
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h5 className="text-blue-300 text-lg uppercase mb-4 animate-fadeIn">
                  Best E-learning Platform
                </h5>
                <h1 className="text-white text-5xl font-bold mb-6 animate-slideDown">
                  Transform Your Learning Journey With Quandax
                </h1>
                <p className="text-white text-xl mb-8">
                  Access expert tutoring, interactive courses, and personalized learning paths designed for your success.
                </p>
                <div className="space-x-4">
                  <Link to="/about" className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition">
                    Read More
                  </Link>
                  <Link to="/register" className="bg-white text-gray-800 px-8 py-3 rounded hover:bg-gray-100 transition">
                    Join Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-blue-600 mb-4">
                Advance in your academy with Quandax
              </h1>
              <p className="text-gray-600">
                Learn from the best! Get access to tons of cool courses, projects, and more, taught by expert teachers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: icon1,
                  title: "Learn anything",
                  desc: "Explore any interest or trending topic, take prerequisites, and advance your skills"
                },
                {
                  icon: icon2,
                  title: "Save money",
                  desc: "Spend less money on your learning if you plan to take multiple courses this year"
                },
                {
                  icon: icon3,
                  title: "Flexible learning",
                  desc: "Learn at your own pace, move between multiple courses, or switch to a different course"
                },
                {
                  icon: icon4,
                  title: "Unlimited certificates",
                  desc: "Earn a certificate for every learning program that you complete at no additional cost"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <img src={feature.icon} alt="" className="w-16 h-16 mx-auto mb-4"/>
                  <h5 className="text-xl font-semibold mb-3">{feature.title}</h5>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Courses Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h6 className="text-blue-600 font-semibold mb-2">Popular Courses</h6>
              <h1 className="text-3xl font-bold text-blue-600">
                Explore new and trending free online courses
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Course cards would go here - simplified for brevity */}
            </div>

            <div className="text-center mt-12">
              <Link to="/courses" className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition">
                All Courses
              </Link>
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

export default StartPage;
