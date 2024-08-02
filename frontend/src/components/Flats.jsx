import React, { useEffect, useState } from 'react';
import { getFlats } from '../api/apiService';

const Flats = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const data = await getFlats();
        if (Array.isArray(data)) {
          setFlats(data);
        } else {
          console.error('Unexpected data format:', data);
          setError('Unexpected data format');
        }
      } catch (error) {
        console.error('Failed to fetch flats:', error);
        setError('Failed to fetch flats');
      } finally {
        setLoading(false);
      }
    };

    fetchFlats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Flats</h1>
      {flats.length === 0 ? (
        <p>No flats available</p>
      ) : (
        <ul>
          {flats.map(flat => (
            <li key={flat.Id}>
              {flat.Name} - {flat.Status__c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Flats;
