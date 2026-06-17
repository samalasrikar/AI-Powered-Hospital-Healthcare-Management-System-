import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

function AITool({ id, title, icon, description, placeholder, endpoint, requestKey, responseKey, buttonLabel }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setResult('');
    try {
      const { data } = await api.post(endpoint, { [requestKey]: input.trim() });
      const raw = data.data || data;
      setResult(
        typeof raw === 'string' ? raw :
        raw[responseKey] || raw.result || raw.message || JSON.stringify(raw, null, 2)
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card ai-card" id={`ai-tool-${id}`}>
      <div className="card-header">
        <h2 className="card-title">{icon} {title}</h2>
        <span className="ai-badge">AI</span>
      </div>
      <p className="card-description">{description}</p>
      <form onSubmit={handleSubmit} className="ai-form" id={`${id}-form`}>
        <textarea
          id={`${id}-input`}
          className="form-input form-textarea"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
        />
        <button
          type="submit"
          id={`${id}-btn`}
          className={`btn-primary ${loading ? 'loading' : ''}`}
          disabled={loading || !input.trim()}
        >
          {loading ? <><span className="btn-spinner" /> Analyzing...</> : buttonLabel}
        </button>
      </form>
      {error && <div className="auth-error">{error}</div>}
      {result && (
        <div className="ai-result" id={`${id}-result`}>
          <div className="ai-result-header"><span>✨ AI Response</span></div>
          <p className="ai-result-text">{result}</p>
        </div>
      )}
    </div>
  );
}

export default function PatientDashboard() {
  const { user } = useAuth();

  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Patient Portal</h1>
              <p className="page-subtitle">Hello, {user?.fullName} — your health, simplified.</p>
            </div>
          </div>

          <div className="welcome-banner">
            <div className="welcome-banner-content">
              <h2>Welcome to your AI-powered health portal</h2>
              <p>Use the tools below to analyze symptoms, understand your prescriptions, and find the right care.</p>
            </div>
            <div className="welcome-banner-icon">🏥</div>
          </div>

          <div className="ai-tools-grid">
            <AITool
              id="symptom-analyzer"
              title="Symptom Analyzer"
              icon="🔬"
              description="Describe your symptoms and get AI-powered suggestions about possible conditions, urgency level, and the right department to visit."
              placeholder="E.g. I have a high fever, sore throat, and fatigue for 3 days..."
              endpoint="/symptom-analyzer"
              requestKey="symptoms"
              responseKey="analysis"
              buttonLabel="Analyze Symptoms"
            />
            <AITool
              id="prescription-bot"
              title="Prescription Explainer"
              icon="💊"
              description="Paste your prescription details and get a plain-language explanation of each medication, dosage, and what it does."
              placeholder="E.g. Amoxicillin 500mg twice daily for 7 days, Paracetamol 650mg as needed..."
              endpoint="/prescription-bot"
              requestKey="prescription"
              responseKey="explanation"
              buttonLabel="Explain Prescription"
            />
            <AITool
              id="appointment-assistant"
              title="Appointment Assistant"
              icon="📅"
              description="Describe what kind of doctor you need or what's bothering you, and the AI will help you find the right specialist and available slots."
              placeholder="E.g. I need a cardiologist appointment next week, preferably in the morning..."
              endpoint="/appointment-assistant"
              requestKey="query"
              responseKey="response"
              buttonLabel="Find Appointments"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
