'use client';

import { useState } from 'react';
import { MapPin, Users, Building2, Droplets, Zap, Trash2, ArrowRight, Leaf } from 'lucide-react';



export default function DataCollectionForm({ onSubmit }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    population: 0,
    communityType: '',
    energySources: [],
    waterConsumption: '',
    wasteManagement: '',
    publicTransport: '',
    renewableEnergyAccess: '',
    recyclingFacilities: '',
    priorities: [],
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => {
      const current = prev[field];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.location && formData.population > 0 && formData.communityType;
      case 2:
        return formData.energySources.length > 0 && formData.waterConsumption && formData.wasteManagement;
      case 3:
        return formData.publicTransport && formData.renewableEnergyAccess && formData.recyclingFacilities;
      case 4:
        return formData.priorities.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Step {step} of {totalSteps}</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="glass-card p-8">
        {/* Step 1: Community Information */}
        {step === 1 && (
          <div className="fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold">Community Information</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Community Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Greenville Community"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., California, USA"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Users className="w-4 h-4 inline mr-2" />
                Population *
              </label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 50000"
                value={formData.population || ''}
                onChange={(e) => handleChange('population', parseInt(e.target.value) || 0)}
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Community Type *</label>
              <select
                className="form-select"
                value={formData.communityType}
                onChange={(e) => handleChange('communityType', e.target.value)}
                required
              >
                <option value="">Select type...</option>
                <option value="urban">Urban</option>
                <option value="suburban">Suburban</option>
                <option value="rural">Rural</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Resource Usage */}
        {step === 2 && (
          <div className="fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold">Resource Usage</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Primary Energy Sources * (Select all that apply)</label>
              <div className="space-y-2">
                {['Fossil Fuels', 'Solar', 'Wind', 'Hydro', 'Nuclear', 'Other'].map((source) => (
                  <label key={source} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.energySources.includes(source)}
                      onChange={() => handleCheckboxChange('energySources', source)}
                      className="w-4 h-4 text-green-600 rounded"
                    />
                    <span>{source}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Droplets className="w-4 h-4 inline mr-2" />
                Water Consumption Level *
              </label>
              <select
                className="form-select"
                value={formData.waterConsumption}
                onChange={(e) => handleChange('waterConsumption', e.target.value)}
                required
              >
                <option value="">Select level...</option>
                <option value="low">Low (Well below average)</option>
                <option value="moderate">Moderate (Average)</option>
                <option value="high">High (Above average)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Trash2 className="w-4 h-4 inline mr-2" />
                Waste Management Status *
              </label>
              <select
                className="form-select"
                value={formData.wasteManagement}
                onChange={(e) => handleChange('wasteManagement', e.target.value)}
                required
              >
                <option value="">Select status...</option>
                <option value="poor">Poor (Minimal recycling/composting)</option>
                <option value="fair">Fair (Some recycling programs)</option>
                <option value="good">Good (Comprehensive recycling/composting)</option>
                <option value="excellent">Excellent (Zero-waste initiatives)</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Infrastructure */}
        {step === 3 && (
          <div className="fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold">Infrastructure Assessment</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Public Transportation Access *</label>
              <select
                className="form-select"
                value={formData.publicTransport}
                onChange={(e) => handleChange('publicTransport', e.target.value)}
                required
              >
                <option value="">Select access level...</option>
                <option value="none">None</option>
                <option value="limited">Limited</option>
                <option value="moderate">Moderate</option>
                <option value="extensive">Extensive</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Renewable Energy Infrastructure *</label>
              <select
                className="form-select"
                value={formData.renewableEnergyAccess}
                onChange={(e) => handleChange('renewableEnergyAccess', e.target.value)}
                required
              >
                <option value="">Select infrastructure level...</option>
                <option value="none">None</option>
                <option value="planning">In Planning</option>
                <option value="partial">Partial Implementation</option>
                <option value="widespread">Widespread</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Recycling Facilities *</label>
              <select
                className="form-select"
                value={formData.recyclingFacilities}
                onChange={(e) => handleChange('recyclingFacilities', e.target.value)}
                required
              >
                <option value="">Select availability...</option>
                <option value="none">None</option>
                <option value="few">Few</option>
                <option value="adequate">Adequate</option>
                <option value="abundant">Abundant</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Environmental Priorities */}
        {step === 4 && (
          <div className="fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold">Environmental Priorities</h3>
            </div>

            <div className="form-group">
              <label className="form-label">
                Select your top environmental goals * (Select at least one)
              </label>
              <div className="space-y-2">
                {[
                  'Reduce Carbon Emissions',
                  'Water Conservation',
                  'Waste Reduction',
                  'Renewable Energy Adoption',
                  'Biodiversity Protection',
                  'Air Quality Improvement',
                  'Sustainable Transportation',
                  'Green Spaces & Urban Forestry',
                ].map((priority) => (
                  <label key={priority} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.priorities.includes(priority)}
                      onChange={() => handleCheckboxChange('priorities', priority)}
                      className="w-4 h-4 text-green-600 rounded"
                    />
                    <span>{priority}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleBack}
            className="btn btn-secondary"
            disabled={step === 1}
          >
            Back
          </button>

          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
              disabled={!isStepValid()}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isStepValid()}
            >
              Generate Action Plan
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
