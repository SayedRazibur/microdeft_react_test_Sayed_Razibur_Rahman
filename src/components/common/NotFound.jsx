import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="relative w-full max-w-3xl mx-auto text-center px-4">
        {/* Fun 404 Text */}
        <div className="relative">
          <h1 className="text-[180px] font-black text-indigo-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 leading-none animate-wiggle">
              404
            </div>
          </div>
          
          {/* Emoji Face */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-8xl animate-bounce">
              🤔
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Whoops! Lost in Space
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Looks like this page took a wrong turn at the internet junction!
          </p>
        </div>

        {/* Home Button */}
        <Link 
          to="/" 
          className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium text-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-indigo-500/20 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Beam Me Home 🚀
        </Link>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-6xl animate-spin-slow">
          🌟
        </div>
        <div className="absolute bottom-20 right-10 text-6xl animate-float">
          👾
        </div>
        <div className="absolute top-40 right-20 text-4xl animate-pulse">
          💫
        </div>
        <div className="absolute bottom-40 left-20 text-4xl animate-bounce">
          🛸
        </div>
      </div>
    </div>
  );
};

export default NotFound; 