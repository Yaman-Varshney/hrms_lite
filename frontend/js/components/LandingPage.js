function LandingPage({ onNavigate }) {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Welcome to HRMS Lite</h2>
      <p style={{ textAlign: "center", color: "#6b7280" }}>
        Choose a section to continue
      </p>

      <div className="landing">
        <div className="card" onClick={() => onNavigate("employees")}>
          <h2>Employees</h2>
          <p>Manage employee records</p>
        </div>

        <div
          className="card attendance"
          onClick={() => onNavigate("attendance")}
        >
          <h2>Attendance</h2>
          <p>Mark daily attendance</p>
        </div>
      </div>
    </>
  );
}
