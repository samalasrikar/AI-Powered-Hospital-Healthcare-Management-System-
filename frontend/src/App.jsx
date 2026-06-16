import { useState } from "react";

function App() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeSymptoms = async () => {
    try {
      setLoading(true);
      setError("");
      setResult("");

      const response = await fetch(
        "http://localhost:5000/api/symptom-analyzer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ symptoms }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Analysis failed");
      }

      setResult(data.analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1>AI Symptom Analyzer</h1>

      <textarea
        rows="6"
        style={{ width: "100%" }}
        placeholder="Enter symptoms (e.g. fever, cough, headache)"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <br />
      <br />

      <button onClick={analyzeSymptoms} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Symptoms"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          Error: {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Analysis Result</h2>
          <pre>{result}</pre>
          <p>
            <strong>Disclaimer:</strong> This is not a medical diagnosis.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;