import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img src="/src/assets/Fyplogo.jpg" alt="Logo" className="h-12 w-auto" />
            <p className="text-gray-300">
              Your premier destination for fashion and style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Shop', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} 
                        className="text-gray-300 hover:text-accent-orange transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <FiMapPin className="text-accent-orange" />
                123 Fashion Street, City
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FiPhone className="text-accent-orange" />
                +1 234 567 890
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FiMail className="text-accent-orange" />
                info@storename.com
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[FiInstagram, FiFacebook, FiTwitter].map((Icon, index) => (
                <a key={index} href="#" 
                   className="h-10 w-10 rounded-full border border-gray-600 flex items-center justify-center
                            hover:border-accent-orange hover:text-accent-orange transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Store Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;