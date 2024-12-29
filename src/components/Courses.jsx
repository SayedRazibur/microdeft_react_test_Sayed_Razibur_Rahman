import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/courses.css';
import Loader from './Loader';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://react-interview.crd4lc.easypanel.host/api/course', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status) {
          setCourses(response.data.data.data);
        } else {
          setError(response.data.status_message || 'Failed to fetch courses.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="courses-container">
      <h2 className="courses-title">Explore Courses</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className="course-card" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="ribbon">
                <div className={`ribbon-badge ${course.badge_color}`}>
                  {course.badge_text}
                </div>
              </div>

              <div className="card-content">
                <div className="course-image">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400?text=No+Image';
                      }}
                    />
                  ) : (
                    <img
                      src="https://placehold.co/600x400?text=No+Image"
                      alt="Placeholder"
                    />
                  )}
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
              <div className="progress-bar"></div>
            </div>
          ))
        ) : (
          <p className="no-courses">No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;