function EmployeeTable({ employees, onDelete, onRowClick }) {
  if (employees.length === 0) {
    return <p className="empty">No employees found</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Email</th><th>Dept</th><th></th><th></th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          
          <tr className="employee-row" key={emp.employee_id}>

            <td>{emp.employee_id}</td>
            <td>{emp.full_name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>
              <button className="danger" onClick={() => onDelete(emp.employee_id)}>
                Delete
              </button>
            </td>
            <td>
              <button className="success"  onClick={() => onRowClick(emp.employee_id)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
