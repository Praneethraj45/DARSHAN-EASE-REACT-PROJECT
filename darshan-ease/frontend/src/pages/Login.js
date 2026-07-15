import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Login() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await loginUser(form);
      login(data);
      toast.success(`Welcome back, ${data.firstName}! 🙏`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logoIcon}>🛕</div>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.sub}>Sign in to manage your bookings</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" placeholder="Your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p style={styles.switchText}>No account? <Link to="/register" style={styles.link}>Create one</Link></p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: '#f9f9f9' },
  card: { background: '#fff', borderRadius: 16, border: '1px solid #eee', padding: '2rem', width: '100%', maxWidth: 380, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' },
  header: { textAlign: 'center', marginBottom: '1.75rem' },
  logoIcon: { fontSize: 40, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 700, color: '#1a1a1a' },
  sub: { fontSize: 13, color: '#888', marginTop: 4 },
  group: { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6, display: 'block' },
  input: { width: '100%', border: '1px solid #ddd', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' },
  btn: { width: '100%', background: '#B56B2B', color: '#fff', border: 'none', padding: 12, borderRadius: 8, fontSize: 14, cursor: 'pointer', fontWeight: 700, marginTop: 8 },
  switchText: { textAlign: 'center', marginTop: 16, fontSize: 13, color: '#888' },
  link: { color: '#B56B2B', fontWeight: 600, textDecoration: 'none' }
};

export default Login;
