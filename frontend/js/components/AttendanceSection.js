function AttendanceSection() {
  const [employees, setEmployees] = React.useState([]);
  const [employeeId, setEmployeeId] = React.useState("");
  const [date, setDate] = React.useState("");
  const [status, setStatus] = React.useState("PRESENT");
  const [records, setRecords] = React.useState([]);
  const [error, setError] = React.useState("");

  // Load employee options + default date
  React.useEffect(() => {
    const init = async () => {
      try {
        const data = await Api.getEmployeeOptions();
        setEmployees(data);

        if (data.length > 0) {
          setEmployeeId(data[0].employee_id);
        }

        // Default date = today
        setDate(new Date().toISOString().split("T")[0]);
      } catch (e) {
        setError(e.message);
      }
    };

    init();
  }, []);

  const loadAttendance = async () => {
    if (!employeeId) return;
    setRecords(await Api.getAttendance(employeeId));
  };

  const submit = async () => {
    try {
      await Api.markAttendance({
        employee_id: employeeId,
        date,
        status
      });
      loadAttendance();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <h2>Attendance</h2>

      {error && <p className="error">{error}</p>}

      {employees.length === 0 ? (
        <p className="empty">No employees available</p>
      ) : (
        <>
          <label>Employee</label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            {employees.map(emp => (
              <option key={emp.employee_id} value={emp.employee_id}>
                {emp.full_name} ({emp.employee_id})
              </option>
            ))}
          </select>

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>

          <button type="button" onClick={submit}>
            Mark Attendance
          </button>

          {records.length > 0 && (
            <>
              <h3>Attendance Records</h3>
              <ul>
                {records.map(r => (
                  <li key={r.date}>
                    {r.date} – {r.status}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
}
