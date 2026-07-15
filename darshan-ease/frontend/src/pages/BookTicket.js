import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTemple, createBooking } from '../api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function BookTicket() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [temple, setTemple]       = useState(null);
  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSlot, setSelectedSlot]   = useState('');
  const [selectedPooja, setSelectedPooja] = useState(0);
  const [form, setForm] = useState({
    visitDate: new Date().toISOString().split('T')[0],
    devoteeCount: 1,
    devoteeName: '',
    devoteePhone: '',
    aadharLast4: ''
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getTemple(id);
        setTemple(data);
      } catch {
        toast.error('Temple not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const ticketFee = temple ? temple.ticketPrice * form.devoteeCount : 0;
  const poojaFee  = temple ? (temple.poojaTypes[selectedPooja]?.price || 0) : 0;
  const total     = ticketFee + poojaFee + 20;

  const handleSubmit = async () => {
    if (!user) { toast.error('Please login to book'); navigate('/login'); return; }
    if (!selectedSlot) { toast.error('Select a time slot'); return; }
    if (!form.devoteeName || !form.devoteePhone) { toast.error('Fill devotee details'); return; }

    try {
      setSubmitting(true);
      const { data } = await createBooking({
        templeId: id,
        visitDate: form.visitDate,
        timeSlot: selectedSlot,
        devoteeCount: form.devoteeCount,
        poojaType: temple.poojaTypes[selectedPooja]?.name,
        poojaFee,
        devoteeName: form.devoteeName,
        devoteePhone: form.devoteePhone,
        aadharLast4: form.aadharLast4
      });
      toast.success(`Booking confirmed! Ref: ${data.bookingRef}`);
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Loading...</div>;
  if (!temple)  return null;

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.card}>
          <h2 style={styles.heading}>{temple.emoji} {temple.name} — Book Ticket</h2>

          {/* Temple info */}
          <div style={styles.templeInfo}>
            <span>📍 {temple.location}, {temple.state}</span>
            <span>⭐ {temple.rating}</span>
            <span style={{ color: '#B56B2B', fontWeight: 600 }}>₹{temple.ticketPrice}/person</span>
          </div>

          {/* Date & Count */}
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Date of Visit</label>
              <input type="date" style={styles.input} value={form.visitDate} onChange={e => setForm({ ...form, visitDate: e.target.value })} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Devotees</label>
              <input type="number" style={styles.input} min={1} max={10} value={form.devoteeCount} onChange={e => setForm({ ...form, devoteeCount: parseInt(e.target.value) })} />
            </div>
          </div>

          {/* Time Slots */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Select Time Slot</label>
            <div style={styles.slotGrid}>
              {temple.availableSlots.map(slot => {
                const isFull = slot.booked >= slot.capacity;
                const isSelected = selectedSlot === slot.time;
                return (
                  <button
                    key={slot.time}
                    onClick={() => !isFull && setSelectedSlot(slot.time)}
                    style={{ ...styles.slotBtn, ...(isFull ? styles.slotFull : {}), ...(isSelected ? styles.slotSelected : {}) }}
                    disabled={isFull}
                  >
                    {slot.time}
                    {isFull && <div style={{ fontSize: 10, marginTop: 2 }}>Full</div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pooja Types */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Pooja Type</label>
            {temple.poojaTypes.map((p, i) => (
              <div key={i} onClick={() => setSelectedPooja(i)} style={{ ...styles.poojaItem, ...(selectedPooja === i ? styles.poojaSelected : {}) }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{p.description}</div>
                </div>
                <div style={{ color: '#B56B2B', fontWeight: 600, fontSize: 13 }}>{p.price > 0 ? '₹' + p.price : 'Free'}</div>
              </div>
            ))}
          </div>

          {/* Devotee Details */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: 16, marginTop: 8 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Devotee Details</div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input style={styles.input} placeholder="Your name" value={form.devoteeName} onChange={e => setForm({ ...form, devoteeName: e.target.value })} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input style={styles.input} placeholder="10-digit mobile" value={form.devoteePhone} onChange={e => setForm({ ...form, devoteePhone: e.target.value })} />
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Aadhar (last 4 digits)</label>
              <input style={{ ...styles.input, maxWidth: 160 }} placeholder="XXXX" maxLength={4} value={form.aadharLast4} onChange={e => setForm({ ...form, aadharLast4: e.target.value })} />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={styles.summary}>
        <div style={styles.summaryTitle}>🧾 Booking Summary</div>
        {[
          ['Temple', temple.name],
          ['Date', new Date(form.visitDate).toLocaleDateString('en-IN')],
          ['Time', selectedSlot || '—'],
          ['Devotees', form.devoteeCount],
          ['Pooja', temple.poojaTypes[selectedPooja]?.name],
          ['Ticket fee', '₹' + ticketFee],
          ['Pooja fee', '₹' + poojaFee],
          ['Service charge', '₹20']
        ].map(([k, v]) => (
          <div key={k} style={styles.summaryRow}>
            <span style={{ color: '#888' }}>{k}</span>
            <span style={{ fontWeight: 500 }}>{v}</span>
          </div>
        ))}
        <div style={{ ...styles.summaryRow, borderTop: '1px solid #eee', paddingTop: 10, marginTop: 6, fontWeight: 700, fontSize: 16 }}>
          <span>Total</span><span style={{ color: '#B56B2B' }}>₹{total}</span>
        </div>
        <button onClick={handleSubmit} disabled={submitting} style={styles.payBtn}>
          {submitting ? 'Processing...' : '💳 Pay & Confirm'}
        </button>
        <div style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 8 }}>🔒 Secure payment via UPI / Razorpay</div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, padding: '1.5rem', maxWidth: 960, margin: '0 auto' },
  card: { background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' },
  heading: { fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#1a1a1a' },
  templeInfo: { display: 'flex', gap: 16, fontSize: 13, color: '#666', marginBottom: 20, flexWrap: 'wrap' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6, display: 'block' },
  input: { width: '100%', border: '1px solid #ddd', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' },
  slotGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 8 },
  slotBtn: { border: '1px solid #ddd', background: '#fafafa', borderRadius: 8, padding: 8, fontSize: 12, cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' },
  slotFull: { opacity: 0.4, cursor: 'not-allowed', textDecoration: 'line-through' },
  slotSelected: { background: '#B56B2B', color: '#fff', border: '1px solid #B56B2B' },
  poojaItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #eee', borderRadius: 8, padding: '10px 12px', marginTop: 8, cursor: 'pointer' },
  poojaSelected: { border: '1px solid #B56B2B', background: '#FEF3E7' },
  left: {},
  summary: { background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: '1.25rem', height: 'fit-content', position: 'sticky', top: 72, boxShadow: '0 1px 6px rgba(0,0,0,0.05)' },
  summaryTitle: { fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#1a1a1a' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 },
  payBtn: { width: '100%', background: '#B56B2B', color: '#fff', border: 'none', padding: 13, borderRadius: 8, fontSize: 14, cursor: 'pointer', fontWeight: 700, marginTop: 16 }
};

export default BookTicket;
