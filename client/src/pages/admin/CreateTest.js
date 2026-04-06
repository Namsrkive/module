import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { createTestAPI } from "../../api/api";
import "../../styles/test.css";

function CreateTest() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("module");
  const [difficulty, setDifficulty] = useState("medium");
  const [module, setModule] = useState("");
  const [topic, setTopic] = useState("");
  const [company, setCompany] = useState("");

  const modules = {
    Aptitude: ["Quant Basics", "Probability", "Number Series", "Logical Reasoning"],
    DSA: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
    DBMS: ["Normalization", "SQL Queries", "Transactions"],
    Programming: ["OOP", "Operating Systems", "Computer Networks"]
  };

  const handleCreate = async () => {
    if (!title || !duration) {
      alert("Please enter a Test Name and Duration.");
      return;
    }

    const testData = {
      name: title,
      duration: Number(duration),
      type,
      difficulty,
      ...(type === "module" && { module, topic }),
      ...(type === "company" && { company })
    };

    try {
      await createTestAPI(testData);
      alert("Test Configuration Saved!");
      setTitle("");
      setDuration("");
      setModule("");
      setTopic("");
      setCompany("");
    } catch (err) {
      alert("Error creating test. Please check connection.");
    }
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="dashboard-main">
        <header className="page-header">
          <h1 className="page-title">Create New Assessment</h1>
          <p className="page-subtitle">Configure test parameters and target modules.</p>
        </header>

        <div className="builder-container">
          <div className="builder-card">
            <h3 className="card-section-title">General Information</h3>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Test Name</label>
                <input 
                  placeholder="e.g., Q1 Aptitude Mock" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Duration (Minutes)</label>
                <input 
                  type="number" 
                  placeholder="30" 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Difficulty Level</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <hr className="divider" />

            <h3 className="card-section-title">Test Logic & Target</h3>
            
            <div className="form-group">
              <label>Classification Type</label>
              <div className="type-toggle">
                <button 
                  className={type === "module" ? "active" : ""} 
                  onClick={() => setType("module")}
                >
                  By Module
                </button>
                <button 
                  className={type === "company" ? "active" : ""} 
                  onClick={() => setType("company")}
                >
                  By Company
                </button>
              </div>
            </div>

            <div className="dynamic-fields">
              {type === "module" && (
                <div className="form-grid">
                  <div className="form-group">
                    <label>Module</label>
                    <select value={module} onChange={(e) => { setModule(e.target.value); setTopic("") }}>
                      <option value="">Select Module</option>
                      {Object.keys(modules).map(m => (<option key={m} value={m}>{m}</option>))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Topic</label>
                    <select value={topic} onChange={(e) => setTopic(e.target.value)} disabled={!module}>
                      <option value="">Select Topic</option>
                      {module && modules[module].map(t => (<option key={t} value={t}>{t}</option>))}
                    </select>
                  </div>
                </div>
              )}

              {type === "company" && (
                <div className="form-group">
                  <label>Target Company</label>
                  <select value={company} onChange={(e) => setCompany(e.target.value)}>
                    <option value="">Select Company</option>
                    <option>TCS</option>
                    <option>IBM</option>
                    <option>Accenture</option>
                    <option>Wipro</option>
                    <option>Deloitte</option>
                  </select>
                </div>
              )}
            </div>

            <div className="builder-footer">
              <button className="btn-primary" onClick={handleCreate}>
                Generate Test Instance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTest;