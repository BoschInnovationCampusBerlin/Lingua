import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ContextInput: React.FC<Props> = ({ value, onChange }) => (
  <textarea
    className="w-full p-2 border"
    placeholder="Enter context here..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default ContextInput;