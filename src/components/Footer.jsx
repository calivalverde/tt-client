
import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-900/50 text-center py-4 mt-8">
      <div className="container mx-auto px-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} TheTritone.com. All rights reserved. A tool for musicians.
      </div>
    </footer>
  );
}

export default Footer;
