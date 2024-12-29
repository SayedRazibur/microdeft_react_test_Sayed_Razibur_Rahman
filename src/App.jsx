import { Routes, Route, useLocation } from 'react-router-dom';
import Auth from './components/Auth';
import AddCourse from './components/AddCourse';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  const location = useLocation();
  const authRoutes = ['/auth'];
  const showLayout = !authRoutes.includes(location.pathname);

  if (!showLayout) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route 
          path="/" 
          element={<ProtectedRoute><Courses /></ProtectedRoute>} 
        />
        <Route 
          path="/add-course" 
          element={<ProtectedRoute><AddCourse /></ProtectedRoute>} 
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;