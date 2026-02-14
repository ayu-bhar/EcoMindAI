'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export const useDashboardData = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // 1. Protect the Route
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    // 2. Fetch Data ONLY if user exists
    if (user) {
      const fetchData = async () => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
          setStats([
            { title: "Carbon Reduced", value: "12.5 Tons", trend: "+12%", status: "up" },
            { title: "Water Saved", value: "1,240 Gal", trend: "+5%", status: "up" },
            { title: "Energy Score", value: "85/100", trend: "Stable", status: "neutral" },
            { title: "Active Projects", value: "4", trend: "+1", status: "up" }
          ]);
          setPlans([
            { id: 1, title: 'Install Solar Community Grid', priority: 'High', status: 'In Progress', date: '2023-11-15' },
            { id: 2, title: 'Local Waste Audit', priority: 'Medium', status: 'Pending', date: '2023-11-20' },
          ]);
          setLoading(false);
        }, 1000);
      };
      fetchData();
    }
  }, [user, authLoading, router]);

  return { loading: loading || authLoading, stats, plans, user };
};