import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Register() {
  const [form, setForm]       = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await registerUser(form);
      login(data);
      toast.success(`Welcome, ${data.firstName}! 🙏`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const f = (field) => ({ value: form[field], onChange: e => setForm({ ...form, [field]: e.target.value }) });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logoIcon}>🛕</div>
          <h2 style={styles.title}>Create account</h2>
          <p style={styles.sub}>Join thousands of devotees</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.label}>First Name</label>
              <input style={styles.input} placeholder="Ravi" {...f('firstName')} required />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Last Name</label>
              <input style={styles.input} placeholder="Kumar" {...f('lastName')} required />
            </div>
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Mobile Number</label>
            <input style={styles.input} placeholder="9876543210" {...f('phone')} required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" placeholder="ravi@email.com" {...f('email')} required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" placeholder="Min 6 characters" {...f('password')} required />
          </div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p style={styles.switchText}>Already registered? <Link to="/login" style={styles.link}>Sign in</Link></p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: '#f9f9f9' },
  card: { background: '#fff', borderRadius: 16, border: '1px solid #eee', padding: '2rem', width: '100%', maxWidth: 400, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' },
  header: { textAlign: 'center', marginBottom: '1.5rem' },
  logoIcon: { fontSize: 40, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 700, color: '#1a1a1a' },
  sub: { fontSize: 13, color: '#888', marginTop: 4 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  group: { marginBottom: 13 },
  label: { fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6, display: 'block' },
  input: { width: '100%', border: '1px solid #ddd', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' },
  btn: { width: '100%', background: '#B56B2B', color: '#fff', border: 'none', padding: 12, borderRadius: 8, fontSize: 14, cursor: 'pointer', fontWeight: 700, marginTop: 8 },
  switchText: { textAlign: 'center', marginTop: 14, fontSize: 13, color: '#888' },
  link: { color: '#B56B2B', fontWeight: 600, textDecoration: 'none' }
};

export default Register;
