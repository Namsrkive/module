const BASE_URL = process.env.REACT_APP_API_URL;

/* ================= TESTS ================= */

// Get all tests
export const fetchTests = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/tests`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch tests");

  return res.json();
};

// Filter tests by module & topic
export const fetchTestsByModuleTopic = async (module, topic) => {
const token = localStorage.getItem("token");

const res = await fetch(
`${BASE_URL}/api/tests/filter?module=${module}&topic=${topic}`,
{
headers: {
Authorization: `Bearer ${token}`
}
}
);

if (!res.ok) throw new Error("Failed to fetch tests");

return res.json();
};

// Create test
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
const err = await res.json();
throw new Error(err.error || "Failed to create test");
}

return res.json();
};

// Delete test
export const deleteTestAPI = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/tests/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to delete test");
};

// Toggle publish
export const togglePublishAPI = async (id) => {
  const token = localStorage.getItem("token");

  console.log("Calling API for:", id); // 👈 ADD

  const res = await fetch(`${BASE_URL}/api/tests/${id}/publish`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log("Response status:", res.status); // 👈 ADD

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || data.error);
  }

  return data;
};

// Generate test questions
export const generateTestAPI = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/tests/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to generate test");
  }

  return res.json();
};

/* ================= QUESTIONS ================= */

// Get all questions
export const fetchQuestions = async () => {
const res = await fetch(`${BASE_URL}/api/questions`);
if (!res.ok) throw new Error("Failed to fetch questions");
return res.json();
};

// Add question
export const addQuestionAPI = async (data) => {
const res = await fetch(`${BASE_URL}/api/questions`, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(data)
});

if (!res.ok) {
const err = await res.json();
throw new Error(err.error || "Failed to add question");
}

return res.json();
};

/* ================= SEED ================= */

export const seedCompanyAPI = async (company) => {
const token = localStorage.getItem("token");

const res = await fetch(`${BASE_URL}/api/seed/company`, {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${token}`
},
body: JSON.stringify({ company })
});

if (!res.ok) {
const err = await res.json();
throw new Error(err.error || "Seeder failed");
}

return res.json();
};
