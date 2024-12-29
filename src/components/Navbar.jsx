import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('token');
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/auth';
  };

  const activeStyle = "relative text-blue-600 font-semibold before:absolute before:inset-x-0 before:-bottom-2 before:h-0.5 before:bg-blue-600 before:transform before:origin-left";
  const normalStyle = "relative text-gray-600 hover:text-blue-600 transition-colors before:absolute before:inset-x-0 before:-bottom-2 before:h-0.5 before:bg-blue-600 before:transform before:scale-x-0 hover:before:scale-x-100 before:origin-left before:transition-transform before:duration-300";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? 'bg-white/70 backdrop-blur-lg shadow-lg border-b border-white/20' 
          : 'bg-white/50 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Microdeft
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {isAuthenticated ? (
                <>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      isActive ? activeStyle : normalStyle
                    }
                    end
                  >
                    Courses
                  </NavLink>
                  <NavLink 
                    to="/add-course" 
                    className={({ isActive }) => 
                      isActive ? activeStyle : normalStyle
                    }
                  >
                    Create Course
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-500 border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 backdrop-blur-sm bg-white/30"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink 
                  to="/auth" 
                  className={({ isActive }) => 
                    isActive ? activeStyle : normalStyle
                  }
                >
                  Login / Register
                </NavLink>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`absolute w-full left-0 md:hidden transition-all duration-500 ease-in-out transform origin-top ${
              isOpen
                ? 'opacity-100 scale-y-100 translate-y-0 bg-gradient-to-b from-white via-white to-white/95 shadow-xl shadow-blue-500/20 border border-white/20'
                : 'opacity-0 scale-y-95 -translate-y-2'
            } overflow-hidden`}
          >
            <div className={`px-2 pt-2 pb-3 space-y-1 transition-all duration-500 delay-100 transform ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}>
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transform transition-all duration-300 hover:scale-105 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-700 font-semibold shadow-lg'
                          : 'bg-white/80 text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-700 hover:shadow-lg'
                      }`
                    }
                    end
                  >
                    Courses
                  </NavLink>
                  <NavLink
                    to="/add-course"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transform transition-all duration-300 hover:scale-105 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-700 font-semibold shadow-lg'
                          : 'bg-white/80 text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-700 hover:shadow-lg'
                      }`
                    }
                  >
                    Create Course
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 bg-white/80 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent hover:shadow-lg transform"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transform transition-all duration-300 hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-700 font-semibold shadow-lg'
                        : 'bg-white/80 text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-700 hover:shadow-lg'
                    }`
                  }
                >
                  Login / Register
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar; 