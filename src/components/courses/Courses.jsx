import { useState, useEffect } from 'react';
import { fetchCourses } from '../../services/api';
import Loader from '../common/Loader';
import '../../styles/courses.css';

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400?text=No+Image';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderCourseCard = (course, index) => (
    <div 
      key={course.id || index} 
      className="course-card" 
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="ribbon">
        <div className={`ribbon-badge ${course.badge_color}`}>
          {course.badge_text}
        </div>
      </div>

      <div className="card-content">
        <div className="course-image">
          <img
            src={course.image || PLACEHOLDER_IMAGE}
            alt={course.title}
            onError={(e) => { e.target.src = PLACEHOLDER_IMAGE }}
          />
        </div>

        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>

        <div className="card-footer">
          <p className="instructor">
            <span>by </span>
            {course.instructor_name}
          </p>
          <div className="details-link">
            <span>Course Details</span>
            <svg className="arrow-icon" viewBox="0 0 24 24">
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div className="courses-container">
      <h2 className="courses-title">Explore Courses</h2>
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map(renderCourseCard)
        ) : (
          <p className="no-courses">No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;