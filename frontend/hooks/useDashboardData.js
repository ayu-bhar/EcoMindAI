'use client';
import { useState, useEffect } from 'react';

export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate API Call to Python Backend
    const fetchData = async () => {
      setLoading(true);
      
      // Mocking network delay
      setTimeout(() => {
        setUser({ name: "Alex Johnson", role: "Community Leader" });
        
        setStats([
          { title: "Carbon Reduced", value: "12.5 Tons", trend: "+12%", status: "up" },
          { title: "Water Saved", value: "1,240 Gal", trend: "+5%", status: "up" },
          { title: "Energy Score", value: "85/100", trend: "Stable", status: "neutral" },
          { title: "Active Projects", value: "4", trend: "+1", status: "up" }
        ]);

        setPlans([
          { id: 1, title: 'Install Solar Community Grid', priority: 'High', status: 'In Progress', date: '2023-11-15' },
          { id: 2, title: 'Local Waste Audit', priority: 'Medium', status: 'Pending', date: '2023-11-20' },
          { id: 3, title: 'Rainwater Harvesting Setup', priority: 'Low', status: 'Completed', date: '2023-10-01' },
        ]);
        
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);

  return { loading, stats, plans, user };
};