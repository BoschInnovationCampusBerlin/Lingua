import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ContextInput: React.FC<Props> = ({ value, onChange }) => (
  <textarea
    style={{ width: '98%', border: '1px solid #ccc' }}
    placeholder="Enter context here..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default ContextInput;