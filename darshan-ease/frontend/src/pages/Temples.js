import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTemples } from '../api';

function Temples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const navigate = useNavigate();

  useEffect(() => { fetchTemples(); }, []);

  const fetchTemples = async (q = '') => {
    try {
      setLoading(true);
      const { data } = await getTemples(q);
      setTemples(data);
    } catch { } finally { setLoading(false); }
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>All Temples</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            style={{ border: '1px solid #ddd', borderRadius: 8, padding: '8px 12px', fontSize: 14, outline: 'none', width: 220 }}
            placeholder="Search temple or city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchTemples(search)}
          />
          <button onClick={() => fetchTemples(search)} style={{ background: '#B56B2B', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Search</button>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>Loading...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {temples.map(t => (
            <div key={t._id} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }} onClick={() => navigate(`/book/${t._id}`)}>
              <div style={{ height: 100, background: '#FEF3E7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44 }}>{t.emoji}</div>
              <div style={{ padding: 14 }}>
                <div style={{ fontSize: 10, color: '#B56B2B', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{t.tag}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>📍 {t.location}, {t.state}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ color: '#B56B2B', fontWeight: 700, fontSize: 14 }}>₹{t.ticketPrice}/person</span>
                  <span style={{ color: '#666', fontSize: 13 }}>⭐ {t.rating}</span>
                </div>
                <button style={{ width: '100%', background: '#B56B2B', color: '#fff', border: 'none', padding: '8px 0', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Temples;
