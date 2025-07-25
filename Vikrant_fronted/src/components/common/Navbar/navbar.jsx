import React from 'react';
import { Users, FileText, Phone } from 'lucide-react';

const Navbar = ({ currentSection, setCurrentSection }) => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/90 backdrop-blur-md border border-gray-700 rounded-full shadow-2xl px-6 py-3">
        <div className="flex items-center space-x-8">
          
          {/* Brand with Glow Animation */}
          <div
            className="text-lg font-bold bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 bg-clip-text text-transparent 
                       hover:scale-105 transform transition duration-300 cursor-pointer whitespace-nowrap"
            onClick={() => setCurrentSection('home')}
          >
            HAQUENICH
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-3">
            {[
              { label: 'Home', section: 'home' },
              { label: 'Team', section: 'team', icon: <Users size={16} /> },
              { label: 'Project', section: 'project', icon: <FileText size={16} /> },
              { label: 'Contact', section: 'contact', icon: <Phone size={16} /> },
            ].map(({ label, section, icon }) => (
              <button
                key={section}
                onClick={() => setCurrentSection(section)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform 
                  ${currentSection === section
                    ? 'bg-blue-500 text-white scale-105 shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:scale-105'}`}
              >
                {icon && icon}
                <span className="whitespace-nowrap">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;