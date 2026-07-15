import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        <div style={styles.logoIcon}>🛕</div>
        <div>
          <div style={styles.logoText}>Darshan Ease</div>
          <div style={styles.logoSub}>Temple Ticket Booking</div>
        </div>
      </Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/temples" style={styles.link}>Temples</Link>
        {user && <Link to="/my-bookings" style={styles.link}>My Bookings</Link>}
      </div>

      <div style={styles.right}>
        {user ? (
          <>
            <span style={styles.greeting}>Hi, {user.firstName} 🙏</span>
            <button onClick={handleLogout} style={styles.btnLogin}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button style={styles.btnLogin}>Login</button></Link>
            <Link to="/register"><button style={styles.btnRegister}>Register</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { background: '#fff', borderBottom: '1px solid #eee', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  logo: { display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' },
  logoIcon: { width: 38, height: 38, background: '#B56B2B', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 },
  logoText: { fontSize: 16, fontWeight: 600, color: '#1a1a1a' },
  logoSub: { fontSize: 11, color: '#999' },
  links: { display: 'flex', gap: 4 },
  link: { textDecoration: 'none', color: '#555', padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500 },
  right: { display: 'flex', gap: 8, alignItems: 'center' },
  greeting: { fontSize: 14, color: '#555' },
  btnLogin: { border: '1px solid #ddd', background: 'none', padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500 },
  btnRegister: { background: '#B56B2B', border: 'none', padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', color: '#fff', fontWeight: 500 }
};

export default Navbar;
