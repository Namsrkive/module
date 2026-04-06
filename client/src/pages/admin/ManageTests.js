import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Search, Trash2, Eye, EyeOff, FileText, Clock, BarChart } from "lucide-react"; 
import { fetchTests, deleteTestAPI, togglePublishAPI } from "../../api/api";
import "../../styles/adminPages.css";

function ManageTests() {
  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTests = async () => {
    try {
      const data = await fetchTests();
      setTests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assessment? This action cannot be undone.")) return;
    await deleteTestAPI(id);
    loadTests();
  };

  const handleToggle = async (id) => {
    await togglePublishAPI(id);
    loadTests();
  };

  const filteredTests = tests.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading-screen"><h2>Fetching Assessments...</h2></div>;

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="dashboard-main">
        <header className="page-header">
          <div className="header-info">
            <h1 className="page-title">Manage Assessments</h1>
            <p className="dashboard-sub">Control visibility, monitor metadata, and organize your test library.</p>
          </div>
          <div className="header-stats">
            <span className="stat-pill">Total: {tests.length}</span>
            <span className="stat-pill published">Live: {tests.filter(t => t.isPublished).length}</span>
          </div>
        </header>

        {/* SEARCH BAR */}
        <div className="search-container-large">
          <Search size={20} className="search-icon" />
          <input
            className="search-input-modern"
            placeholder="Search by test name, type or technology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE CONTAINER */}
        <div className="table-wrapper">
          {filteredTests.length === 0 ? (
            <div className="no-data-msg">
              <FileText size={48} />
              <p>No assessments found matching your search.</p>
            </div>
          ) : (
            <table className="admin-table-modern">
              <thead>
                <tr>
                  <th>Assessment Details</th>
                  <th>Config</th>
                  <th>Questions</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTests.map((t) => (
                  <tr key={t._id}>
                    <td className="td-main">
                      <div className="test-name-cell">
                        <span className="test-primary-name">{t.name}</span>
                        <span className="test-secondary-type">{t.type}</span>
                      </div>
                    </td>
                    
                    <td>
                      <span className={`diff-pill ${t.difficulty}`}>
                        {t.difficulty}
                      </span>
                    </td>

                    <td>
                      <div className="icon-text">
                        <BarChart size={14} /> {t.questions?.length || 0} items
                      </div>
                    </td>

                    <td>
                      <div className="icon-text">
                        <Clock size={14} /> {t.duration} min
                      </div>
                    </td>

                    <td>
                      <span className={`status-badge ${t.isPublished ? "published" : "draft"}`}>
                        {t.isPublished ? "Live" : "Inactive"}
                      </span>
                    </td>

                    <td className="actions-cell">
                      <button
                        className={`action-btn ${t.isPublished ? "unpublish" : "publish"}`}
                        onClick={() => handleToggle(t._id)}
                        title={t.isPublished ? "Unpublish Test" : "Publish Test"}
                      >
                        {t.isPublished ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>

                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(t._id)}
                        title="Delete Assessment"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageTests;