function EmployeePage({ onBack, onEmployeeClick }) {
  return (
    <>
      <button
        type="button"
        className="back-btn"
        onClick={onBack}
      >
        ← Back
      </button>

      <EmployeeSection onEmployeeClick={onEmployeeClick} />
    </>
  );
}
