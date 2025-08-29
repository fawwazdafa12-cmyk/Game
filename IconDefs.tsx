
import React from 'react';

const IconDefs: React.FC = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#7F1DFF' }} />
        <stop offset="100%" style={{ stopColor: '#38BDF8' }} />
      </linearGradient>
    </defs>
  </svg>
);

export default IconDefs;
