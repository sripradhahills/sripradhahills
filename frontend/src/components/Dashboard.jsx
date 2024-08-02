import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../api/apiService';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Flats: {dashboardData.totalFlats}</p>
      <p>Occupied Flats: {dashboardData.occupiedFlats}</p>
      <p>Vacant Flats: {dashboardData.vacantFlats}</p>
      <p>Total Rent Collected: {dashboardData.totalRentCollected}</p>
      <p>Total Expenses: {dashboardData.totalExpenses}</p>
    </div>
  );
};

export default Dashboard;
