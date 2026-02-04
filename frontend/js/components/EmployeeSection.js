function EmployeeSection({ onEmployeeClick }) {
  const [employees, setEmployees] = React.useState([]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(true); // <-- track loading

  const load = async () => {
    setLoading(true); // start loading
    try {
      const data = await Api.getEmployees();
      setEmployees(data);
      setError("");
    } catch (e) {
      setError(e.message || "Failed to load employees");
      setEmployees([]);
    } finally {
      setLoading(false); // done loading
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const add = async (data) => {
  try {
    const newEmployee = await Api.addEmployee(data); // await creation
    // Option 1: Reload all employees
    try {
      await load(); 
    } catch (e) {
      console.warn("Failed to reload employees after adding:", e.message);
      // Keep the previous employees plus the new one to avoid empty table
      setEmployees(prev => [...prev, newEmployee]);
    }
  } catch (e) {
    alert("Failed to add employee: " + (e.message || e));
  }
};


  const remove = async (id) => {
    await Api.deleteEmployee(id);
    load();
  };

  return (
    <>
      <h2>Employee Management</h2>
      {error && <p className="error">{error}</p>}
      <EmployeeForm onEmployeeAdded={load} />
      <EmployeeTable
        employees={employees}
        loading={loading}          // pass loading prop
        onDelete={remove}
        onRowClick={onEmployeeClick}
      />
    </>
  );
}