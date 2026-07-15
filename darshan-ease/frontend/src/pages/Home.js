import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTemples } from '../api';

function Home() {
  const [temples, setTemples] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchTemples(); }, []);

  const fetchTemples = async (q = '') => {
    try {
      setLoading(true);
      const { data } = await getTemples(q);
      setTemples(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTemples(search);
  };

  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>🕉 Book Your Darshan Online</h1>
        <p style={styles.heroSub}>Skip the queue. Reserve your time slot for temples across Andhra Pradesh & Telangana</p>
        <form onSubmit={handleSearch} style={styles.searchBar}>
          <span style={{ color: '#999', fontSize: 18 }}>🔍</span>
          <input
            style={styles.searchInput}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search temple or city..."
          />
          <button type="submit" style={styles.searchBtn}>Search</button>
        </form>
      </div>

      {/* Stats */}
      <div style={styles.statsBar}>
        {[['250+', 'Temples'], ['1.2L+', 'Devotees'], ['98%', 'Satisfaction'], ['24/7', 'Support']].map(([num, label]) => (
          <div key={label} style={styles.stat}>
            <div style={styles.statNum}>{num}</div>
            <div style={styles.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      {/* Temple Cards */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Popular Temples</h2>
        {loading ? (
          <p style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>Loading temples...</p>
        ) : (
          <div style={styles.grid}>
            {temples.map(t => (
              <div key={t._id} style={styles.card} onClick={() => navigate(`/book/${t._id}`)}>
                <div style={styles.cardImg}>{t.emoji}</div>
                <div style={styles.cardBody}>
                  <div style={styles.cardTag}>{t.tag}</div>
                  <div style={styles.cardName}>{t.name}</div>
                  <div style={styles.cardLoc}>📍 {t.location}, {t.state}</div>
                  <div style={styles.cardMeta}>
                    <span style={styles.cardPrice}>₹{t.ticketPrice}/person</span>
                    <span style={styles.cardRating}>⭐ {t.rating}</span>
                  </div>
                  <button style={styles.bookBtn}>Book Now</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  hero: { background: 'linear-gradient(135deg, #7C3D0E, #B56B2B, #E8A95C)', padding: '3.5rem 1.5rem', textAlign: 'center', color: '#fff' },
  heroTitle: { fontSize: 32, fontWeight: 700, marginBottom: 8 },
  heroSub: { fontSize: 15, opacity: 0.9, marginBottom: '2rem' },
  searchBar: { background: '#fff', borderRadius: 12, padding: '12px 16px', maxWidth: 560, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'center' },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#333', background: 'transparent' },
  searchBtn: { background: '#B56B2B', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' },
  statsBar: { background: '#fff', padding: '1.25rem', display: 'flex', justifyContent: 'center', gap: '3rem', borderBottom: '1px solid #eee' },
  stat: { textAlign: 'center' },
  statNum: { fontSize: 22, fontWeight: 700, color: '#B56B2B' },
  statLabel: { fontSize: 12, color: '#999', marginTop: 2 },
  section: { padding: '2rem 1.5rem', maxWidth: 1100, margin: '0 auto' },
  sectionTitle: { fontSize: 20, fontWeight: 600, marginBottom: '1.25rem', color: '#1a1a1a' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 },
  card: { background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' },
  cardImg: { width: '100%', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, background: '#FEF3E7' },
  cardBody: { padding: 12 },
  cardTag: { fontSize: 10, color: '#B56B2B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  cardName: { fontSize: 14, fontWeight: 600, marginBottom: 4, color: '#1a1a1a' },
  cardLoc: { fontSize: 12, color: '#888', marginBottom: 8 },
  cardMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 13, fontWeight: 600, color: '#B56B2B' },
  cardRating: { fontSize: 12, color: '#666' },
  bookBtn: { marginTop: 8, width: '100%', background: '#B56B2B', color: '#fff', border: 'none', padding: '7px 0', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 600 }
};

export default Home;
