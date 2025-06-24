import React from 'react';

type Props = {
  onFileSelected: (file: File) => void;
};

const FileUploader: React.FC<Props> = ({ onFileSelected }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  return <input type="file" accept=".csv" onChange={handleChange} />;
};

export default FileUploader;