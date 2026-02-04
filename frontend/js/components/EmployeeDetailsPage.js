function EmployeeDetailsPage({ employeeId, onBack }) {
  const [summary, setSummary] = React.useState(null);
  const [attendance, setAttendance] = React.useState([]);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");

  // Fetch employee summary and attendance
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryRes = await fetch(`${API_BASE}/employees/${employeeId}/attendance/summary`);
        const summaryData = await summaryRes.json();
        setSummary(summaryData);

        const attendanceRes = await fetch(`${API_BASE}/employees/${employeeId}/attendance`);
        const attendanceData = await attendanceRes.json();
        setAttendance(attendanceData);
      } catch (err) {
        console.error("Failed to load employee data:", err);
      }
    };

    fetchData();
  }, [employeeId]);

  if (!summary) return <p>Loading employee details...</p>;

  // Frontend filtering
  const filteredAttendance = attendance.filter(record => {
    if (!record.date || !record.status) return false; // ignore invalid records
    if (fromDate && record.date < fromDate) return false;
    if (toDate && record.date > toDate) return false;
    return true;
  });

  return (
    <div className="employee-details">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <h2>{summary.full_name}</h2>
      <p>Total Present Days: <b>{summary.total_present_days}</b></p>

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
            {filteredAttendance.map(row => {
              const isPresent = row.status?.trim().toUpperCase();
              return (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td >
                    {isPresent}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
