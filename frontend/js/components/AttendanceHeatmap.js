function AttendanceHeatmap({ attendance }) {
  const startDate = new Date(new Date().getFullYear(), 0, 1);
  const endDate = new Date(new Date().getFullYear(), 11, 31);

  const { weeks, monthLabels } = buildHeatmapData(
    attendance,
    startDate,
    endDate
  );

  const totalPresent = attendance.filter(a => a.value > 0).length;

  function getColor(value) {
    if (value === 0) return "level-0";
    if (value === 1) return "level-1";
    if (value === 2) return "level-2";
    return "level-3";
  }

  return (
    <div className="heatmap-wrapper">
      <h3>Attendance Heatmap</h3>
      <p><strong>Total Present Days:</strong> {totalPresent}</p>

      <div className="months">
        {monthLabels.map(m => (
          <span key={m.week} style={{ gridColumnStart: m.week + 1 }}>
            {m.label}
          </span>
        ))}
      </div>

      <div className="heatmap">
        {weeks.map((week, i) => (
          <div className="week-column" key={i}>
            {week.map((day, d) => (
              <div
                key={d}
                className={`day-cell ${getColor(day?.value || 0)}`}
                title={day ? `${day.date}` : ""}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
