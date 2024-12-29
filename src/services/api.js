import axios from 'axios';

const API_URL = 'https://react-interview.crd4lc.easypanel.host/api';

export const fetchCourses = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.get(`${API_URL}/course`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status) {
      return response.data.data.data;
    }
    throw new Error(response.data.status_message || 'Failed to fetch courses.');
  } catch (error) {
    throw error;
  }
}; 