import "./App.css";

function App() {
  const exportPDF = () => {
    alert("PDF Report Downloaded");
  };

  const exportExcel = () => {
    alert("Excel Report Downloaded");
  };

  return (
    <div className="container">
      <h1>Report Export System</h1>

      <div className="report-card">
        <h2>Hospital Analytics Report</h2>

        <p>Total Patients: 1250</p>
        <p>Total Revenue: ₹25,00,000</p>
        <p>Bed Occupancy: 82%</p>
      </div>

      <div className="button-group">
        <button onClick={exportPDF}>
          Export PDF
        </button>

        <button onClick={exportExcel}>
          Export Excel
        </button>
      </div>
    </div>
  );
}

export default App;