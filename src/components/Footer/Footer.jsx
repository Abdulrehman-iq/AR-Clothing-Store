import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-surface-light">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img src="/assets/fyplogo.png" alt="Logo" className="h-20 w-auto" />
            <p className="text-content-light">
              Your premier destination where you try-on first.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-surface-light">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Shop', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} 
                        className="text-content-light hover:text-interactive-hover transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-surface-light">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-content-light">
                <FiMapPin className="text-interactive-hover" />
                123 Fashion Street, City
              </li>
              <li className="flex items-center gap-2 text-content-light">
                <FiPhone className="text-interactive-hover" />
                +1 234 567 890
              </li>
              <li className="flex items-center gap-2 text-content-light">
                <FiMail className="text-interactive-hover" />
                info@storename.com
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-surface-light">Follow Us</h3>
            <div className="flex space-x-4">
              {[FiInstagram, FiFacebook, FiTwitter].map((Icon, index) => (
                <a key={index} href="#" 
                   className="h-10 w-10 rounded-full border border-primary-700 flex items-center justify-center
                            hover:border-interactive-hover hover:text-interactive-hover transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700 mt-12 pt-8 text-center text-content-light">
          <p>&copy; {new Date().getFullYear()} AR Clothing Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;