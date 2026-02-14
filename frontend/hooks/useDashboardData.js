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
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

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

          // ENHANCED DATA STRUCTURE:
          // Adding communityData and content objects to each plan
          setPlans([
            { 
              id: 1, 
              title: 'Install Solar Community Grid', 
              priority: 'High', 
              status: 'In Progress', 
              date: '2023-11-15',
              communityData: {
                name: "Evergreen Heights",
                location: "Portland, OR",
                population: 12500
              },
              content: {
                summary: "A comprehensive transition to localized solar energy to reduce grid dependency by 40% over the next two years.",
                actionItems: [
                  {
                    name: "Rooftop Assessment",
                    description: "Lidar scanning of all south-facing rooftops to determine maximum kilowatt potential.",
                    timeline: "3 Months",
                    cost: "$15,000",
                    impact: "Critical Foundation"
                  },
                  {
                    name: "Grid Integration",
                    description: "Setup of community battery storage units to store excess daytime energy.",
                    timeline: "8 Months",
                    cost: "$120,000",
                    impact: "Resilience"
                  }
                ]
              }
            },
            { 
              id: 2, 
              title: 'Local Waste Audit', 
              priority: 'Medium', 
              status: 'Pending', 
              date: '2023-11-20',
              communityData: {
                name: "Green Valley",
                location: "California",
                population: 5000
              },
              content: {
                summary: "Analyzing residential waste streams to implement a zero-waste organic composting program.",
                actionItems: [
                  {
                    name: "Waste Characterization",
                    description: "Sorting 500 random samples to identify primary landfill contributors.",
                    timeline: "1 Month",
                    cost: "$5,000",
                    impact: "Data Accuracy"
                  }
                ]
              }
            },
          ]);
          setLoading(false);
        }, 1000);
      };
      fetchData();
    }
  }, [user, authLoading, router]);

  return { loading: loading || authLoading, stats, plans, user };
};