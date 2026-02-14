'use client';

import { CheckCircle, Clock, DollarSign, Target, Download, MapPin, Users, TrendingUp } from 'lucide-react';



export default function ActionPlanDisplay({ plan, communityData }) {
  const handleDownload = () => {
    const content = `
EcoMindAI Action Plan
Community: ${communityData.name}
Location: ${communityData.location}
Generated: ${new Date().toLocaleDateString()}

${plan.summary}

Action Items:
${plan.actionItems
        .map(
          (item, i) => `
${i + 1}. ${item.name}
   Description: ${item.description}
   Timeline: ${item.timeline}
   Cost: ${item.cost}
   Expected Impact: ${item.impact}
`
        )
        .join('\n')}

Expected Outcomes:
${plan.expectedOutcomes.map((outcome, i) => `${i + 1}. ${outcome}`).join('\n')}

Resource Requirements:
${plan.resourceRequirements}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${communityData.name.replace(/\s/g, '_')}_action_plan.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="glass-card p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2 gradient-text">
              Your Personalized Action Plan
            </h2>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {communityData.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {communityData.population.toLocaleString()} residents
              </span>
            </div>
          </div>
          <button onClick={handleDownload} className="btn btn-secondary">
            <Download className="w-4 h-4" />
            Download Plan
          </button>
        </div>

        {/* Executive Summary */}
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-600">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            Executive Summary
          </h3>
          <p className="text-green-800 dark:text-green-200">{plan.summary}</p>
        </div>
      </div>

      {/* Action Items */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-green-600" />
          Prioritized Actions
        </h3>
        <div className="space-y-4">
          {plan.actionItems.map((item, index) => (
            <div key={index} className="glass-card p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                  <p className="text-gray-600 mb-4">{item.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Timeline</p>
                        <p className="font-medium">{item.timeline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Cost Estimate</p>
                        <p className="font-medium">{item.cost}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Expected Impact</p>
                        <p className="font-medium">{item.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Outcomes */}
      <div className="glass-card p-6 mb-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          Expected Outcomes
        </h3>
        <ul className="space-y-3">
          {plan.expectedOutcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Resource Requirements */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4">Resource Requirements</h3>
        <p className="text-gray-700 leading-relaxed">{plan.resourceRequirements}</p>
      </div>

      {/* Call to Action */}
      <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Ready to Make an Impact?</h3>
        <p className="mb-4">
          Share this plan with community leaders, local government, and stakeholders to begin implementing
          these sustainable solutions.
        </p>
        <button onClick={handleDownload} className="btn bg-white text-green-600 hover:bg-gray-100">
          <Download className="w-4 h-4" />
          Download Full Report
        </button>
      </div>
    </div>
  );
}
