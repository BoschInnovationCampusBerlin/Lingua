import React from 'react';
import './DashboardPage.css';

const vendors = [
  { name: 'Vendor A', component: 'Component 1', preferenceMatch: '95%' },
  { name: 'Vendor B', component: 'Component 2', preferenceMatch: '92%' },
  { name: 'Vendor C', component: 'Component 3', preferenceMatch: '90%' },
  { name: 'Vendor D', component: 'Component 4', preferenceMatch: '88%' },
  { name: 'Vendor E', component: 'Component 5', preferenceMatch: '85%' },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1>Top 5 Vendors</h1>
      <div className="vendor-list">
        {vendors.map((vendor, index) => (
          <div key={index} className="vendor-card">
            <h2>{vendor.name}</h2>
            <p>Component: {vendor.component}</p>
            <p>Preference Match: {vendor.preferenceMatch}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage; 