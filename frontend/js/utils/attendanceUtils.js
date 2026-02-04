function generateDateRange(startDate, endDate) {
  const dates = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function getStartOfWeek(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function buildHeatmapData(attendance, startDate, endDate) {
  const dateMap = {};
  attendance.forEach(a => {
    dateMap[a.date] = a.value;
  });

  const dates = generateDateRange(startDate, endDate);
  const startWeek = getStartOfWeek(startDate);

  const weeks = [];
  const monthLabels = [];

  dates.forEach(date => {
    const weekIndex = Math.floor(
      (date - startWeek) / (7 * 24 * 60 * 60 * 1000)
    );

    if (!weeks[weekIndex]) {
      weeks[weekIndex] = Array(7).fill(null);
    }

    const day = date.getDay();
    const key = date.toISOString().slice(0, 10);

    weeks[weekIndex][day] = {
      value: dateMap[key] || 0,
      date: key,
    };

    if (date.getDate() === 1) {
      monthLabels.push({
        week: weekIndex,
        label: date.toLocaleString("default", { month: "short" }),
      });
    }
  });

  return { weeks, monthLabels };
}
