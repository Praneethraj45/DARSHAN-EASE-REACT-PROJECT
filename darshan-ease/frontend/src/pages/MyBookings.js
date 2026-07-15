import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyBookings, cancelBooking } from '../api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function MyBookings() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]  = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await getMyBookings();
      setBookings(data);
    } catch (err) {
      toast.error('Could not load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await cancelBooking(id);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch {
      toast.error('Could not cancel booking');
    }
  };

  const statusColor = { confirmed: '#16a34a', cancelled: '#dc2626', completed: '#2563eb' };
  const statusBg    = { confirmed: '#dcfce7', cancelled: '#fee2e2', completed: '#dbeafe' };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Loading bookings...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>My Bookings</h2>
        <button onClick={() => navigate('/temples')} style={styles.newBtn}>+ New Booking</button>
      </div>

      {bookings.length === 0 ? (
        <div style={styles.empty}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🙏</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No bookings yet</div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>Book your first darshan slot today</div>
          <button onClick={() => navigate('/temples')} style={styles.newBtn}>Book Now</button>
        </div>
      ) : (
        bookings.map(b => (
          <div key={b._id} style={styles.item}>
            <div style={styles.itemLeft}>
              <div style={{ fontSize: 28 }}>🛕</div>
            </div>
            <div style={styles.itemBody}>
              <div style={styles.itemTitle}>{b.templeName}</div>
              <div style={styles.itemMeta}>📅 {new Date(b.visitDate).toLocaleDateString('en-IN')} &nbsp;|&nbsp; ⏰ {b.timeSlot}</div>
              <div style={styles.itemMeta}>🙏 {b.poojaType} &nbsp;|&nbsp; 👤 {b.devoteeCount} devotee(s)</div>
              <div style={styles.itemMeta}>🔖 Ref: {b.bookingRef}</div>
              <span style={{ ...styles.badge, background: statusBg[b.status], color: statusColor[b.status] }}>
                {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
              </span>
              {b.status === 'confirmed' && (
                <button onClick={() => handleCancel(b._id)} style={styles.cancelBtn}>Cancel</button>
              )}
            </div>
            <div style={styles.amount}>₹{b.totalAmount}</div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  page: { padding: '1.5rem', maxWidth: 720, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 700, color: '#1a1a1a' },
  newBtn: { background: '#B56B2B', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 600 },
  empty: { textAlign: 'center', padding: '3rem 1rem', color: '#888' },
  item: { background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: '1.25rem', marginBottom: 12, display: 'flex', gap: 14, alignItems: 'flex-start', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  itemLeft: { fontSize: 28 },
  itemBody: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 },
  itemMeta: { fontSize: 13, color: '#666', marginBottom: 3 },
  badge: { display: 'inline-block', padding: '2px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, marginTop: 6 },
  cancelBtn: { marginLeft: 10, border: '1px solid #fca5a5', background: 'none', color: '#dc2626', padding: '3px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer' },
  amount: { fontSize: 16, fontWeight: 700, color: '#B56B2B', whiteSpace: 'nowrap' }
};

export default MyBookings;
