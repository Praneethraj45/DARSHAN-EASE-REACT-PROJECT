import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import Navbar     from './components/Navbar';
import Home       from './pages/Home';
import Temples    from './pages/Temples';
import BookTicket from './pages/BookTicket';
import MyBookings from './pages/MyBookings';
import Login      from './pages/Login';
import Register   from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', background: '#f9f9f9', fontFamily: 'Segoe UI, sans-serif' }}>
          <Navbar />
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/temples"      element={<Temples />} />
            <Route path="/book/:id"     element={<BookTicket />} />
            <Route path="/my-bookings"  element={<MyBookings />} />
            <Route path="/login"        element={<Login />} />
            <Route path="/register"     element={<Register />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
