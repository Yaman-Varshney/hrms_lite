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
      await Api.addEmployee(data);
      load();
    } catch (e) {
      alert(e.message);
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
      <EmployeeForm onAdd={add} />
      <EmployeeTable
        employees={employees}
        loading={loading}          // pass loading prop
        onDelete={remove}
        onRowClick={onEmployeeClick}
      />
    </>
  );
}