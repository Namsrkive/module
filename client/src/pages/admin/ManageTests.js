import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../styles/adminPages.css";

import {
  getTests,
  deleteTest,
  togglePublish
} from "../../data/testStore";

function ManageTests() {

  const [tests, setTests] = useState([]);

  // Load tests
  useEffect(() => {
    setTests(getTests());
  }, []);

  // Delete test
  const handleDelete = (id) => {
    deleteTest(id);
    setTests(getTests()); // refresh
  };

  // Publish toggle
  const handleToggle = (id) => {
    togglePublish(id);
    setTests(getTests()); // refresh
  };

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="admin-content">

        <h2>Manage Tests</h2>

        {tests.length === 0 ? (
          <p>No tests created yet.</p>
        ) : (

          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Questions</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tests.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.type}</td>
                  <td>{t.difficulty}</td>
                  <td>{t.duration} min</td>
                  <td>{t.questions?.length || 0}</td>

                  <td>
                    {t.isPublished ? (
                      <span className="published">Published</span>
                    ) : (
                      <span className="draft">Draft</span>
                    )}
                  </td>

                  <td>
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn publish"
                      onClick={() => handleToggle(t.id)}
                    >
                      {t.isPublished ? "Unpublish" : "Publish"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}

      </div>
    </div>
  );
}

export default ManageTests;