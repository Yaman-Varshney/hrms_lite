export default function EmployeeForm({ onEmployeeAdded }) {
  const [form, setForm] = React.useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const [errors, setErrors] = React.useState({});
  const [formError, setFormError] = React.useState("");

  function validate() {
  const errs = {};

  if (!form.employee_id.trim())
    errs.employee_id = "Employee ID is required";

  if (form.full_name.trim().length < 3)
    errs.full_name = "Name must be at least 3 characters";

  if (!window.validators.isValidEmail(form.email))
    errs.email = "Invalid email address";

  if (!form.department)
    errs.department = "Department is required";

  setErrors(errs);

  if (Object.keys(errs).length > 0) {
    setFormError("Please fix the errors above and try again.");
    return false;
  }

  setFormError("");
  return true;
}


  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!validate()) return;

    try {
      const res = await fetch(`${API_BASE}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Something went wrong");
        return;
      }

      onEmployeeAdded();
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: ""
      });

    } catch (err) {
      setFormError("Unable to connect to server");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={e => setForm({ ...form, employee_id: e.target.value })}
      />
      <small className="error">{errors.employee_id}</small>

      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={e => setForm({ ...form, full_name: e.target.value })}
      />
      <small className="error">{errors.full_name}</small>

      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <small className="error">{errors.email}</small>

      <input
        placeholder="Department"
        value={form.department}
        onChange={e => setForm({ ...form, department: e.target.value })}
      />
      <small className="error">{errors.department}</small>

      <button type="submit">Add Employee</button>

      {/* 🔴 Global Form Error */}
      {formError && (
        <div className="form-error">
          {formError}
        </div>
      )}
    </form>
  );
}
