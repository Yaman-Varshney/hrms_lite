function EmployeeSection({ onEmployeeClick}) {
  const [employees, setEmployees] = React.useState([]);
  const [error, setError] = React.useState("");

  const load = async () => {
    try {
      setEmployees(await Api.getEmployees());
    } catch (e) {
      setError(e.message);
    }
  };

  React.useEffect(() => {
  const fetchEmployees = async () => {
    try {
      setEmployees(await Api.getEmployees());
    } catch (e) {
      setError(e.message);
    }
  };

  fetchEmployees();
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
      <EmployeeTable employees={employees} onDelete={remove} onRowClick={onEmployeeClick} />
    </>
  );
}
