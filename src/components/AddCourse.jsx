import { useState } from "react";
import axios from "axios";

function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor_name: "",
  });
  const [selectedBadge, setSelectedBadge] = useState({
    color: "blue",
    text: "New"
  });
  const [message, setMessage] = useState("");

  const badges = [
    { 
      color: "blue", 
      text: "New", 
      background: "rgba(0, 0, 255, 85%)" 
    },
    { 
      color: "green", 
      text: "Featured", 
      background: "rgba(0, 128, 0, 85%)" 
    },
    { 
      color: "red", 
      text: "Hot", 
      background: "rgba(255, 0, 0, 85%)" 
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const submissionData = {
        ...formData,
        badge_color: selectedBadge.color,
        badge_text: selectedBadge.text
      };
      
      await axios.post(
        "https://react-interview.crd4lc.easypanel.host/api/course",
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Course added successfully!");
    } catch (error) {
      setMessage("Failed to add course. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 pb-20 pt-10">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Create New Course
        </h2>
        
        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/50 hover:shadow-indigo-500/10 transition-all duration-500">
          <div className="space-y-5">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 opacity-80">
                Course Title
              </label>
              <input
                type="text"
                placeholder="Enter course title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 bg-white/50 hover:bg-white/80"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 opacity-80">
                Description
              </label>
              <textarea
                placeholder="Enter course description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 bg-white/50 hover:bg-white/80 resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 opacity-80">
                Badge Style
              </label>
              <div className="flex gap-3">
                {badges.map((badge) => (
                  <button
                    key={badge.color}
                    type="button"
                    onClick={() => setSelectedBadge({ color: badge.color, text: badge.text })}
                    className={`
                      relative px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-all duration-300
                      hover:scale-105 hover:shadow-lg
                      ${selectedBadge.color === badge.color 
                        ? 'ring-2 ring-offset-2 ring-opacity-50 scale-105' 
                        : 'opacity-85 hover:opacity-100'
                      }
                    `}
                    style={{ 
                      backgroundColor: badge.background,
                      ringColor: badge.background 
                    }}
                  >
                    {badge.text}
                    {selectedBadge.color === badge.color && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-white rounded-full animate-ping" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 opacity-80">
                Instructor Name
              </label>
              <input
                type="text"
                placeholder="Enter instructor name"
                value={formData.instructor_name}
                onChange={(e) => setFormData({ ...formData, instructor_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 bg-white/50 hover:bg-white/80"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
            >
              Create Course
            </button>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
              message.includes('success') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
