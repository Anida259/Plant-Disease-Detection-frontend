import React, { useState } from 'react';
import './App.css';



function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('landing');



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };


  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setResult(data);
      setPage('result');
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    setLoading(false);
  };


  const LandingPage = () => (
    <div className="page-container landing">
      <img src="logo.png" alt="LeafCare logo" className="logo-image" />
      <p className="subtitle">Detecting Disease with AI Vision</p>
      <button className="primary-btn" onClick={() => setPage('upload')}>
        Get Started
      </button>
    </div>
  );
  

  const UploadPage = () => (
    <div className="upload-wrapper">
      <div className="upload-header">
        <button className="back-btn" onClick={() => setPage('landing')}>
          ← Back
        </button>
        <h2 className="upload-title"> Upload a Leaf Image </h2>
      </div>
  
      <div className="upload-box">
        {previewUrl && <img src={previewUrl} alt="Preview" className="preview-image" />}
  
        <div className="upload-controls">
          <input type="file" onChange={handleFileChange} className="file-input" />
          <button
            onClick={handleUpload}
            className="primary-btn"
            disabled={!file || loading}
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </div>
      </div>
    </div>
  );
  
  

  const ResultPage = () => (
    <div className="upload-wrapper">
      <div className="upload-header">
        <button className="back-btn" onClick={() => setPage('landing')}>
          ← Back
        </button>
        <h2 className="upload-title"> Prediction Result </h2>
      </div>
  
      {result && (
        <div className="upload-box">
          <div className="result-text">
            <p><strong>Disease:</strong> {result.class}</p>
            <p><strong>Confidence:</strong> {result.confidence}</p>
            {result.treatment && <p><strong>Treatment:</strong> {result.treatment}</p>}
            {result.class.toLowerCase().includes('healthy') ? (
              <p className="healthy">✅ Your plant is healthy!</p>
            ) : (
              <p className="diseased">⚠️ Disease detected! Follow the recommended treatment above.</p>
            )}
          </div>
  
          <button
            onClick={() => {
              setPage('upload');
              setFile(null);
              setPreviewUrl(null);
              setResult(null);
            }}
            className="primary-btn"
            style={{ marginTop: '20px' }}
          >
            Try Another
          </button>
        </div>
      )}
    </div>
  );



  return (
    <>
      {page === 'landing' && <LandingPage />}
      {page === 'upload' && <UploadPage />}
      {page === 'result' && <ResultPage />}
    </>
  );
}


export default App;