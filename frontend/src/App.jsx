import { useState } from "react";
import "./App.css";

function App() {
  const [report, setReport] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!report.trim()) {
      alert("Please enter a medical report.");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      const response = await fetch(`${API_URL}/emr-summarizer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          report,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.summary || "No summary returned.");
      } else {
        setSummary(data.message || "Failed to generate summary.");
      }
    } catch (error) {
      console.error(error);
      setSummary("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI EMR Summarizer</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          placeholder="Paste medical report here..."
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </form>

      {summary && (
        <div className="summary-box">
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;