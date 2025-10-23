import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';

const NovaPostSearch = () => {
  const [token, setToken] = useState(null);
  const [settlementQuery, setSettlementQuery] = useState('');
  const [settlements, setSettlements] = useState([]);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [divisionQuery, setDivisionQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  const API_KEY = 'ce73f85659e09209ee485640b87c8008';

  // Авторизація
  const getToken = async () => {
    try {
      const res = await fetch(
        `https://api.novapost.com/v.1.0/clients/authorization?apiKey=${API_KEY}`
      );
      const data = await res.json();
      setToken(data.jwt);
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  // Debounce пошук населених пунктів
  const searchSettlements = (text) => {
    setSettlementQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!token) return;

    debounceRef.current = setTimeout(async () => {
      if (text.length < 2) return;

      const params = new URLSearchParams();
      params.append('countryCodes[]', 'UA');
      params.append('limit', 10);
      params.append('name', `*${text}*`);

      try {
        const res = await fetch(`https://api.novapost.com/v.1.0/settlements?${params.toString()}`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setSettlements(data.items || []);
      } catch (err) {
        console.error('Settlement search error:', err);
      }
    }, 400);
  };

  // Отримання відділень
  const getDivisions = async (settlementId) => {
    setLoading(true);
    setDivisions([]);

    const params = new URLSearchParams();
    params.append('countryCodes[]', 'UA');
    params.append('limit', 100);
    params.append('settlementIds[]', settlementId);

    try {
      const res = await fetch(`https://api.novapost.com/v.1.0/divisions?${params.toString()}`, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setDivisions(data.items || []);
    } catch (err) {
      console.error('Division fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Фільтрація відділень
  const filteredDivisions = divisions.filter((d) => {
    const q = divisionQuery.toLowerCase();
    return d.name?.toLowerCase().includes(q) || d.displayAddress?.toLowerCase().includes(q);
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Пошук відділення Нової пошти</h2>

      <p className={styles.note}>
        📦 Для отримання замовлення виберіть <b>вантажне відділення</b>. Відділення до 30 кг і
        поштомати позначені сірим.
      </p>

      {/* Поле пошуку міста */}
      <div className={styles.block}>
        <label>Населений пункт:</label>
        <input
          className={styles.input}
          value={settlementQuery}
          onChange={(e) => searchSettlements(e.target.value)}
          placeholder="Введіть назву міста або села..."
        />

        {settlements.length > 0 && (
          <div className={styles.dropdown}>
            {settlements.map((s) => (
              <div
                key={s.id}
                className={`${styles.option} ${
                  selectedSettlement?.id === s.id ? styles.active : ''
                }`}
                onClick={() => {
                  setSelectedSettlement(s);
                  setSettlements([]);
                  getDivisions(s.id);
                }}
              >
                {s.name} — {s.region?.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Пошук відділення */}
      {selectedSettlement && (
        <div className={styles.block}>
          <label>Відділення ({selectedSettlement.name}):</label>
          <input
            className={styles.input}
            value={divisionQuery}
            onChange={(e) => setDivisionQuery(e.target.value)}
            placeholder="Пошук за адресою або номером..."
          />

          {loading && <p className={styles.loading}>Завантаження...</p>}

          {!loading && divisions.length > 0 && (
            <div className={styles.dropdown}>
              {filteredDivisions.map((d) => (
                <div
                  key={d.id}
                  className={`${styles.option} ${
                    d.divisionCategory === 'PostBranch' || d.divisionCategory === 'Postomat'
                      ? styles.gray
                      : ''
                  }`}
                  onClick={() => alert(`Обрано: ${d.name}`)}
                >
                  <b>{d.name}</b>
                  <br />
                  <small>{d.displayAddress}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NovaPostSearch;
