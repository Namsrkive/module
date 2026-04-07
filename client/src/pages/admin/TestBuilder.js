import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { fetchTests, generateTestAPI } from "../../api/api";
import { Plus, Trash2, Zap, Layout, Settings2 } from "lucide-react"; 
import "../../styles/test.css";

function TestBuilder() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [sections, setSections] = useState([
    { module: "", topic: "", difficulty: "easy", count: 5 }
  ]);

  useEffect(() => {
  const loadTests = async () => {
    try {
      const data = await fetchTests();
      setTests(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch tests (auth issue)");
    }
  };

  loadTests();
}, []);

  const modules = {
    Aptitude: ["Quant Basics", "Probability", "Number Series", "Logical Reasoning"],
    DSA: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
    DBMS: ["Normalization", "SQL Queries", "Transactions"],
    Programming: ["OOP", "Operating Systems", "Computer Networks"]
  };

  const updateSection = (i, key, val) => {
    const updated = [...sections];
    updated[i][key] = val;
    setSections(updated);
  };

  const addSection = () => {
    setSections([...sections, { module: "", topic: "", difficulty: "easy", count: 5 }]);
  };

  const removeSection = (i) => {
    setSections(sections.filter((_, idx) => idx !== i));
  };

  const handleGenerate = async () => {
    if (!selectedTest) return alert("Please select a target test profile first.");
    try {
      await generateTestAPI({ testId: selectedTest, sections });
      alert("✅ Test Questions Populated Successfully");
    } catch (err) {
      console.error(err);
      alert("Error generating test");
    }
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="dashboard-main">
        <header className="page-header">
          <h1 className="page-title">Automated Test Builder</h1>
          <p className="page-subtitle">Define question distribution logic for your assessments.</p>
        </header>

        <div className="builder-wrapper">
          {/* STEP 1: SELECT TEST */}
          <div className="builder-card config-header-card">
            <div className="card-icon-title">
              <Layout size={20} className="text-indigo" />
              <h3>Step 1: Select Assessment Profile</h3>
            </div>
            <div className="form-group-full">
              <select
                className="main-test-select"
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
              >
                <option value="">Choose an existing test...</option>
                {tests.map(t => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* STEP 2: SECTIONS */}
          <div className="sections-list">
            <div className="card-icon-title mb-15">
              <Settings2 size={20} className="text-indigo" />
              <h3>Step 2: Configure Logic Sections</h3>
            </div>

            {sections.map((sec, i) => (
              <div className="builder-card section-row-card" key={i}>
                <div className="section-meta">
                  <span className="section-badge">Section {i + 1}</span>
                  {sections.length > 1 && (
                    <button className="btn-icon-danger" onClick={() => removeSection(i)}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="builder-input-grid">
                  <div className="input-group">
                    <label>Module</label>
                    <select
                      value={sec.module}
                      onChange={(e) => updateSection(i, "module", e.target.value)}
                    >
                      <option value="">Module</option>
                      {Object.keys(modules).map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Topic</label>
                    <select
                      value={sec.topic}
                      onChange={(e) => updateSection(i, "topic", e.target.value)}
                      disabled={!sec.module}
                    >
                      <option value="">Topic</option>
                      {sec.module && modules[sec.module].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Level</label>
                    <select
                      value={sec.difficulty}
                      onChange={(e) => updateSection(i, "difficulty", e.target.value)}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div className="input-group q-count">
                    <label>Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={sec.count}
                      onChange={(e) => updateSection(i, "count", Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="builder-footer-actions">
            <button className="btn-secondary-dashed" onClick={addSection}>
              <Plus size={18} /> Add Logic Section
            </button>

            <button className="btn-primary-gradient" onClick={handleGenerate}>
              <Zap size={18} fill="currentColor" /> Generate Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestBuilder;