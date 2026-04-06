const BASE_URL = process.env.REACT_APP_API_URL;

// TESTS
export const fetchTests = async () => {
  const res = await fetch(`${BASE_URL}/tests`);
  return res.json();
};

export const fetchTestsByModuleTopic = async (module, topic) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/tests/filter?module=${module}&topic=${topic}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch tests");

  return res.json();
};

/* ================= CREATE TEST ================= */
export const createTestAPI = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/tests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to create test");
  }

  return res.json();
};

export const deleteTestAPI = async (id) => {
  await fetch(`${BASE_URL}/tests/${id}`, { method: "DELETE" });
};

export const togglePublishAPI = async (id) => {
  await fetch(`${BASE_URL}/tests/${id}/publish`, { method: "PUT" });
};

export const generateTestAPI = async (data) => {
  await fetch(`${BASE_URL}/tests/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

// QUESTIONS
export const fetchQuestions = async () => {
  const res = await fetch(`${BASE_URL}/questions`);
  return res.json();
};

export const addQuestionAPI = async (data) => {
  await fetch(`${BASE_URL}/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const seedCompanyAPI = async (company) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/seed/company`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ company })
    }
  );

  if (!res.ok) throw new Error("Seeder failed");

  return res.json();
};