async function apiRequest(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "API Error");
  }

  return res.status === 204 ? null : res.json();
}

const Api = {
  getEmployees: () =>
    apiRequest(`${API_BASE}/employees/list`),

  addEmployee: (data) =>
    apiRequest(`${API_BASE}/employees`, {
      method: "POST",
      body: JSON.stringify(data)
    }),

  deleteEmployee: (id) =>
    apiRequest(`${API_BASE}/employees/${id}`, {
      method: "DELETE"
    }),

  markAttendance: (data) =>
    apiRequest(`${API_BASE}/attendance`, {
      method: "POST",
      body: JSON.stringify(data)
    }),

  getAttendance: (id) =>
    apiRequest(`${API_BASE}/attendance/${id}`),

  getEmployeeOptions: () =>
  apiRequest(`${API_BASE}/employees/options`),

};
