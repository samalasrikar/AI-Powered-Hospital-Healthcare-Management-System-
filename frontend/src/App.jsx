import { useState } from "react";

function App() {
  const [medicalRecord, setMedicalRecord] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSummary = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/emr-summarizer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ medicalRecord }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Summary generation failed");
      }

      setSummary(data.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1>Medical Summary Viewer</h1>

      <textarea
        rows="8"
        style={{ width: "100%" }}
        placeholder="Enter patient medical record..."
        value={medicalRecord}
        onChange={(e) => setMedicalRecord(e.target.value)}
      />

      <br />
      <br />

      <button onClick={generateSummary} disabled={loading}>
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      <button
        onClick={generateSummary}
        disabled={loading}
        style={{ marginLeft: "10px" }}
      >
        Refresh Summary
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          Error: {error}
        </div>
      )}

      {summary && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Patient Summary</h2>
          <pre>{summary}</pre>
        </div>
      )}
    </div>
  );
}

export default App;