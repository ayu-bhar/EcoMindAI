'use client';

import { useState } from 'react';
import DataCollectionForm from '@/components/DataCollectionForm';
import ActionPlanDisplay from '@/components/ActionPlanDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Leaf, ArrowLeft } from 'lucide-react';

export default function Home() {
  const [currentView, setCurrentView] = useState('form');
  const [communityData, setCommunityData] = useState(null);
  const [actionPlan, setActionPlan] = useState(null);

  const handleFormSubmit = async (data) => {
    setCommunityData(data);
    setCurrentView('loading');

    try {
      //To impement AI fetch...
    } catch (error) {
      console.error('Error generating action plan:', error);
      alert('Failed to generate action plan. Please ensure the backend server is running.');
      setCurrentView('form');
    }
  };

  const handleStartOver = () => {
    setCurrentView('form');
    setCommunityData(null);
    setActionPlan(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-card mx-4 mt-4 mb-8">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">EcoMindAI</h1>
                <p className="text-sm text-gray-600">Community Environmental Action Planner</p>
              </div>
            </div>
            {currentView === 'results' && (
              <button onClick={handleStartOver} className="btn btn-secondary">
                <ArrowLeft className="w-4 h-4" />
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container pb-12">
        {currentView === 'form' && (
          <div className="fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Create Your Community Action Plan</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Share information about your community, and our AI will generate a personalized
                environmental sustainability plan tailored to your unique needs and resources.
              </p>
            </div>
            <DataCollectionForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {currentView === 'loading' && (
          <div className="fade-in">
            <LoadingSpinner />
          </div>
        )}

        {currentView === 'results' && actionPlan && (
          <div className="fade-in">
            <ActionPlanDisplay plan={actionPlan} communityData={communityData} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="container py-8 text-center text-gray-600">
        <p className="text-sm">
          © 2026 EcoMindAI | Architectured with LOVE by API team | Built for sustainable communities
        </p>
      </footer>
    </div>
  );
}

