import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { getTests, generateTest, getQuestions } from "../../data/testStore";
import "../../styles/adminForms.css";

function TestBuilder() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [sections, setSections] = useState([
    { module: "", topic: "", difficulty: "easy", marks: 1, count: 5, company: "" }
  ]);

  useEffect(() => {
    setTests(getTests());
  }, []);

  const modules = {
    Aptitude: ["Quant Basics", "Probability", "Number Series", "Logical Reasoning"],
    DSA: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
    DBMS: ["Normalization", "SQL Queries", "Transactions"],
    Programming: ["OOP", "Operating Systems", "Computer Networks"]
  };

  const updateSection = (i, key, val) => {
    const updated = [...sections];
    if (key === "module") updated[i].topic = "";
    updated[i][key] = val;
    setSections(updated);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { module: "", topic: "", difficulty: "easy", marks: 1, count: 5, company: "" }
    ]);
  };

  const removeSection = (i) => {
    setSections(sections.filter((_, idx) => idx !== i));
  };

  /* ✅ VALIDATION + GENERATION */
  const handleGenerate = () => {
    if (!selectedTest) return alert("Select a test first");

    for (let sec of sections) {
      if (!sec.module || !sec.topic) {
        return alert("All sections must have module & topic");
      }

      // Check availability
      const available = getQuestions().filter(q =>
        q.module === sec.module &&
        q.topic === sec.topic &&
        q.difficulty === sec.difficulty &&
        q.marks === sec.marks &&
        (sec.company ? q.company === sec.company : true)
      );

      if (available.length < sec.count) {
        return alert(
          `Not enough questions for ${sec.module} - ${sec.topic} (${sec.difficulty})`
        );
      }
    }

    generateTest({ testId: selectedTest, sections });
    alert("✅ Test Generated Successfully");
  };

  /* ✅ SUMMARY CALCULATION */
  const totalQuestions = sections.reduce((sum, s) => sum + s.count, 0);
  const totalMarks = sections.reduce((sum, s) => sum + (s.count * s.marks), 0);

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="dashboard-main">
        <h1 className="page-title">Test Builder</h1>

        {/* TEST SELECT */}
        <div className="form-card">
          <label>Target Assessment</label>
          <select
            value={selectedTest}
            onChange={(e) => setSelectedTest(Number(e.target.value))}
          >
            <option value="">Select a test to build...</option>
            {tests.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* SUMMARY */}
        <div className="summary-card">
          <h3>Test Summary</h3>
          <p>Total Questions: <b>{totalQuestions}</b></p>
          <p>Total Marks: <b>{totalMarks}</b></p>
          <p>Sections: <b>{sections.length}</b></p>
        </div>

        {/* SECTIONS */}
        {sections.map((sec, i) => (
          <div key={i} className="section-card">
            
            <div className="section-top">
              <h4>Section {i + 1}</h4>
              <button className="delete-btn" onClick={() => removeSection(i)}>
                Remove
              </button>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Module</label>
                <select
                  value={sec.module}
                  onChange={(e) => updateSection(i, "module", e.target.value)}
                >
                  <option value="">Select</option>
                  {Object.keys(modules).map(m => <option key={m}>{m}</option>)}
                </select>
              </div>

              <div className="input-group">
                <label>Topic</label>
                <select
                  value={sec.topic}
                  onChange={(e) => updateSection(i, "topic", e.target.value)}
                >
                  <option value="">Select</option>
                  {sec.module && modules[sec.module].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="input-group">
                <label>Difficulty</label>
                <select
                  value={sec.difficulty}
                  onChange={(e) => updateSection(i, "difficulty", e.target.value)}
                >
                  <option>easy</option>
                  <option>medium</option>
                  <option>hard</option>
                </select>
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Marks</label>
                <select
                  value={sec.marks}
                  onChange={(e) => updateSection(i, "marks", Number(e.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                </select>
              </div>

              <div className="input-group">
                <label>Questions</label>
                <input
                  type="number"
                  value={sec.count}
                  onChange={(e) => updateSection(i, "count", Number(e.target.value))}
                />
              </div>

              <div className="input-group">
                <label>Company</label>
                <select
                  value={sec.company}
                  onChange={(e) => updateSection(i, "company", e.target.value)}
                >
                  <option value="">All</option>
                  <option>TCS</option>
                  <option>IBM</option>
                  <option>Accenture</option>
                  <option>Wipro</option>
                  <option>Deloitte</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {/* ACTIONS */}
        <div className="builder-actions">
          <button className="secondary-btn" onClick={addSection}>
            + Add Section
          </button>

          <button className="primary-btn" onClick={handleGenerate}>
            Generate Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestBuilder;