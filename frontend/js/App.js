function App() {
  const [page, setPage] = React.useState("home");
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);

  return (
    <>
      <header>
        <h1>HRMS Lite</h1>
      </header>

      <div className="container">
        {page === "home" && (
          <LandingPage onNavigate={setPage} />
        )}

        {page === "employees" && (
          <EmployeePage
            onBack={() => setPage("home")}
            onEmployeeClick={(employeeId) => {
              setSelectedEmployee(employeeId);
              setPage("employeeDetails");
            }}
          />
        )}

        {page === "attendance" && (
          <AttendancePage onBack={() => setPage("home")} />
        )}

        {page === "employeeDetails" && (
          <EmployeeDetailsPage
            employeeId={selectedEmployee}
            onBack={() => setPage("employees")}
          />
        )}
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
