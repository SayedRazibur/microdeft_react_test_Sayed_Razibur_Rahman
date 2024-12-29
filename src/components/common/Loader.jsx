export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
        {/* Inner ring */}
        <div className="absolute top-1 left-1 w-10 h-10 rounded-full border-4 border-purple-50 border-t-purple-600 animate-spin-slow"></div>
        {/* Center dot */}
        <div className="absolute top-[14px] left-[14px] w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 animate-pulse"></div>
      </div>
    </div>
  );
} 