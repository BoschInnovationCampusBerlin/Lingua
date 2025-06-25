import React, { useState, useMemo } from 'react';
import './DashboardPage.css';
import data from '../../data/dummyData.json';

type Vendor = typeof data.vendors[0];

const getMinMax = (vendors: Vendor[], key: keyof Vendor) => {
  const values = vendors.map(v => v[key]).filter(v => typeof v === 'number') as number[];
  return { min: Math.min(...values), max: Math.max(...values) };
};

const ROLE_PRESETS = {
  procurement: { cost: 5, eta: 2, tolerance: 1 },
  engineering: { cost: 1, eta: 2, tolerance: 5 },
  pm: { cost: 2, eta: 4, tolerance: 2 },
};

const DashboardPage: React.FC = () => {
  const { component, vendors } = data;
  const [sortBy, setSortBy] = useState('preferenceMatch');
  const [weights, setWeights] = useState({ cost: 2, tolerance: 2, eta: 2 });

  const { min: minCost, max: maxCost } = useMemo(() => getMinMax(vendors, 'cost'), [vendors]);
  const { min: minTolerance, max: maxTolerance } = useMemo(() => getMinMax(vendors, 'tolerance'), [vendors]);
  const { min: minEta, max: maxEta } = useMemo(() => getMinMax(vendors, 'etaDays'), [vendors]);

  // New normalization: cost/eta lower is better, tolerance higher is better
  const calculateScore = (vendor: Vendor) => {
    const normCost = (vendor.cost - minCost) / (maxCost - minCost || 1); // 0 = best
    const normEta = (vendor.etaDays - minEta) / (maxEta - minEta || 1); // 0 = best
    const normTolerance = (vendor.tolerance - minTolerance) / (maxTolerance - minTolerance || 1); // 1 = best
    const flippedTolerance = 1 - normTolerance; // 1 = best (higher tolerance)
    const totalWeight = weights.cost + weights.eta + weights.tolerance;
    if (totalWeight === 0) return 0;
    const score = (
      normCost * weights.cost +
      normEta * weights.eta +
      flippedTolerance * weights.tolerance
    ) / totalWeight;
    // Lower score is better, so invert for display (1 = best)
    return (1 - score) * 100;
  };

  const sortedVendors = useMemo(() => {
    const sorted = [...vendors];
    switch (sortBy) {
      case 'cost':
        sorted.sort((a, b) => a.cost - b.cost);
        break;
      case 'tolerance':
        sorted.sort((a, b) => b.tolerance - a.tolerance); // higher is better
        break;
      case 'preferenceMatch':
      default:
        sorted.sort((a, b) => calculateScore(b) - calculateScore(a));
        break;
    }
    return sorted;
  }, [vendors, sortBy, weights, minCost, maxCost, minTolerance, maxTolerance, minEta, maxEta]);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWeights(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleRolePreset = (role: keyof typeof ROLE_PRESETS) => {
    setWeights(ROLE_PRESETS[role]);
  };

  const handleDownloadReport = (vendorName: string) => {
    alert(`Downloading report for ${vendorName}...`);
  };

  const totalWeight = weights.cost + weights.tolerance + weights.eta;
  const formulaString = `Score = ( (NormalizedCost * ${weights.cost}) + (NormalizedETA * ${weights.eta}) + (NormalizedTolerance * ${weights.tolerance}) ) / ${totalWeight}`;

  return (
    <div className="dashboard-container">
      <div className="component-info">
        <h1>{component.name}</h1>
        <p>{component.description}</p>
        <div className="metadata">
          <span><strong>DDI P/N#:</strong> {component.ddi_pn}</span>
          <span><strong>Mfg. Part Number #:</strong> {component.mfg_pn}</span>
        </div>
      </div>
      <div className="sorting-controls">
        <strong>Sort by:</strong>
        <label>
          <input type="radio" value="preferenceMatch" checked={sortBy === 'preferenceMatch'} onChange={(e) => setSortBy(e.target.value)} />
          Best Match
        </label>
        <label>
          <input type="radio" value="cost" checked={sortBy === 'cost'} onChange={(e) => setSortBy(e.target.value)} />
          Cost
        </label>
        <label>
          <input type="radio" value="tolerance" checked={sortBy === 'tolerance'} onChange={(e) => setSortBy(e.target.value)} />
          Tolerance
        </label>
      </div>
      {sortBy === 'preferenceMatch' && (
        <div className="weight-controls">
          <h4>Quick Role Presets</h4>
          <div className="role-buttons">
            <button onClick={() => handleRolePreset('procurement')}>Procurement</button>
            <button onClick={() => handleRolePreset('engineering')}>Engineering</button>
            <button onClick={() => handleRolePreset('pm')}>Project Manager</button>
          </div>
          <div className="info-box">
            <p>
              <strong>How scoring works:</strong><br />
              <ul>
                <li><strong>Cost</strong> and <strong>ETA</strong>: Lower is better (normalized so 0 = best)</li>
                <li><strong>Tolerance</strong>: Higher is better (normalized so 1 = best)</li>
              </ul>
              Adjust the sliders or use a preset to set the importance of each criterion for your needs.<br />
              <strong>Example weights:</strong><br />
              Procurement: Cost 5, ETA 2, Tolerance 1<br />
              Engineering: Cost 1, ETA 2, Tolerance 5<br />
              Project Manager: Cost 2, ETA 4, Tolerance 2
            </p>
          </div>
          <div className="sliders">
            <div className="slider-container">
              <label htmlFor="cost-weight">Cost ({weights.cost})</label>
              <input type="range" id="cost-weight" name="cost" min="1" max="5" step="1" value={weights.cost} onChange={handleWeightChange} />
            </div>
            <div className="slider-container">
              <label htmlFor="tolerance-weight">Tolerance ({weights.tolerance})</label>
              <input type="range" id="tolerance-weight" name="tolerance" min="1" max="5" step="1" value={weights.tolerance} onChange={handleWeightChange} />
            </div>
            <div className="slider-container">
              <label htmlFor="eta-weight">ETA ({weights.eta})</label>
              <input type="range" id="eta-weight" name="eta" min="1" max="5" step="1" value={weights.eta} onChange={handleWeightChange} />
            </div>
          </div>
          <div className="formula-display">
            <p><strong>Calculation Formula:</strong></p>
            <code>{formulaString}</code>
          </div>
        </div>
      )}
      <h2>Top 5 Vendor Matches</h2>
      <div className="vendor-list">
        {sortedVendors.map((vendor: Vendor) => (
          <div key={vendor.name} className="vendor-card">
            <div className="vendor-header">
              <h3>{vendor.name}</h3>
              <span className="preference-match">
                {sortBy === 'preferenceMatch' 
                  ? `Score: ${calculateScore(vendor).toFixed(1)}%`
                  : sortBy === 'tolerance'
                  ? `Tolerance: ±${vendor.tolerance}%`
                  : `Match: ${vendor.preferenceMatch}`
                }
              </span>
            </div>
            <div className="vendor-details">
              <p><strong>Cost:</strong> ${vendor.cost.toFixed(3)}</p>
              <p><strong>Tolerance:</strong> ±{vendor.tolerance}%</p>
              <p><strong>Op. Temp:</strong> {vendor.operatingTemperature}</p>
              <p><strong>Origin:</strong> {vendor.origin}</p>
              <p><strong>Min. Quantity:</strong> {vendor.minQuantity.toLocaleString()}</p>
              <p><strong>Max. Quantity:</strong> {vendor.maxQuantity.toLocaleString()}</p>
              <p><strong>Est. Arrival:</strong> {vendor.eta}</p>
            </div>
            <button 
              className="download-btn" 
              onClick={() => handleDownloadReport(vendor.name)}
            >
              Download Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage; 