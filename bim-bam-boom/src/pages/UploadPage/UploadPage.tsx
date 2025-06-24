import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import ContextInput from '../../components/ContextInput';
import './UploadPage.css';

const fileTypes = ['PDF', ' CSV', ' XLSX', 'PNG'];

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState('');
  const [criteria, setCriteria] = useState('');

  const handleFileChange = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please upload a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('context', context);
    if (criteria.trim() !== '') {
      formData.append('criteria', criteria);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Upload successful');
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">From BOM ...</h1>
      <FileUploader
        multiple={true}
        handleChange={handleFileChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>

      <h2 className="context-title">Context</h2>
      <p className="context-description">
        Please provide any additional context or information that will help us
        understand your BOM better. This could include details about the
        components, their intended use, or any specific requirements you have.
      </p>
      <ContextInput value={context} onChange={setContext} />

      <h2 className="context-title">Would you like us to focus on one or more criterias? Prices, speed of delivery, country of provenance, manufacturer? Please input the info below. </h2>
      <p className="context-description">
      <ContextInput value={criteria} onChange={setCriteria} />
      </p>

      <button className="upload-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default UploadPage;
