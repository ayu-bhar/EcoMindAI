// lib/analyticsUtils.js
export const processCommunityData = (audits) => {
  if (audits.length === 0) return [];

  const categories = [
    { key: 'transportPoints', label: 'Transport' },
    { key: 'electricity', label: 'Energy', isRaw: true },
    { key: 'water', label: 'Water', isRaw: true },
    { key: 'wastePoints', label: 'Waste' },
    { key: 'plasticPoints', label: 'Plastic' },
    { key: 'fuelPoints', label: 'Fuel' },
    { key: 'purchasePoints', label: 'Purchasing' },
    { key: 'foodPoints', label: 'Food Waste' },
  ];

  return categories.map(cat => {
    const total = audits.reduce((sum, audit) => {
      // For raw metrics like electricity, we show the inverse performance 
      // but for points, we show the average points earned
      const value = cat.isRaw ? (audit.results.localScore / 10) : Number(audit.metrics[cat.key]);
      return sum + (value || 0);
    }, 0);
    
    return {
      name: cat.label,
      average: Math.round((total / audits.length) * 10) / 10
    };
  });
};