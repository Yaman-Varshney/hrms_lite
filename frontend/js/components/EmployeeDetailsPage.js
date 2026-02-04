function EmployeeDetailsPage({ employeeId, onBack }) {
  const [summary, setSummary] = React.useState(null);
  const [attendance, setAttendance] = React.useState([]);

  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");

  React.useEffect(() => {
    fetch(`${API_BASE}/employees/${employeeId}/attendance/summary`)
      .then(res => res.json())
      .then(setSummary);

    fetch(`${API_BASE}/employees/${employeeId}/attendance`)
      .then(res => res.json())
      .then(setAttendance);
  }, [employeeId]);

  if (!summary) return <p>Loading employee details...</p>;

  // ✅ FRONTEND FILTERING
  const filteredAttendance = attendance.filter(record => {
    if (fromDate && record.date < fromDate) return false;
    if (toDate && record.date > toDate) return false;
    return true;
  });

  return (
    <div className="employee-details">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <h2>{summary.full_name}</h2>
      <p>
        Total Present Days: <b>{summary.total_present_days}</b>
      </p>

      {/* Filters */}
      <div className="filters">
        <label>
          From:
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
          />
        </label>

        <label>
          To:
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
          />
        </label>
      </div>

      {/* Attendance Table */}
      {filteredAttendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map(row => (
              <tr key={row.date}>
                <td>{row.date}</td>
                <td>
                  {row.status === "Present" ? "✅ Present" : "❌ Absent"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
