import { useState } from "react";
import "./App.css";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("Please enter your appointment request.");
      return;
    }

    // FIXED: Removed the undefined 'message' references
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `${API_URL}/appointment-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setQuery(""); // Optional: clears the textarea after a successful search
      } else {
        alert(data.message || "Failed to get suggestions.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false); // FIXED: Kept single, clean loading reset here
    }
  };

  return (
    <div className="container">
      <h1>AI Appointment Assistant</h1>

      {/* FIXED: Added missing opening form tag */}
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          placeholder="Example: I need a heart specialist next week"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Finding..." : "Find Appointment"}
        </button>
      </form>

      {result && (
        <div className="summary-box">
          <h2>Suggested Department</h2>
          <p>{result.department}</p>

          <h2>Available Doctors</h2>
          <ul>
            {/* Added optional chaining (?.) to prevent crashes if arrays are empty */}
            {result.doctors?.map((doctor, index) => (
              <li key={index}>{doctor}</li>
            ))}
          </ul>

          <h2>Available Slots</h2>
          <ul>
            {result.slots?.map((slot, index) => (
              <li key={index}>{slot}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
