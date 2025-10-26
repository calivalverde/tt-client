
import React from 'react';
import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="bg-slate-900/50 text-center py-4 mt-8">
      <div className="container mx-auto px-4 text-sm text-gray-400">
        <div className="mb-2">
          <Link to="/contact" className="text-green-400 hover:text-green-300 transition-colors">
            Contact Us
          </Link>
        </div>
        <div>
          &copy; {new Date().getFullYear()} TheTritone.com. All rights reserved. A tool for musicians.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
