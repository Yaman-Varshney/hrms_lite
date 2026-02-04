function AttendancePage({ onBack }) {
  return (
    <>
      <button className="back-btn" onClick={onBack}>← Back</button>
      <AttendanceSection />
    </>
  );
}
