import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { addQuestion, getQuestions, deleteQuestion } from "../../data/testStore";
import "../../styles/adminForms.css";

function QuestionBank() {
  const [form, setForm] = useState({
    module: "",
    topic: "",
    type: "mcq",
    company: "",
    question: "",
    options: ["", "", "", ""],
    answer: "",
    marks: 1,
    negativeMarks: 0,
    difficulty: "easy"
  });

  const [filters, setFilters] = useState({
    search: "",
    module: "",
    difficulty: "",
    type: ""
  });

  const modules = {
    Aptitude: ["Quant Basics", "Probability", "Number Series", "Logical Reasoning"],
    DSA: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
    DBMS: ["Normalization", "SQL Queries", "Transactions"],
    Programming: ["OOP", "Operating Systems", "Computer Networks"]
  };

  const companies = ["TCS", "IBM", "Accenture", "Wipro", "Deloitte"];

  const handleChange = (key, value) => {
    if (key === "module") {
      setForm({ ...form, module: value, topic: "" });
    } else {
      setForm({ ...form, [key]: value });
    }
  };

  const handleOptionChange = (i, val) => {
    const updated = [...form.options];
    updated[i] = val;
    setForm({ ...form, options: updated });
  };

  const handleAdd = () => {
    if (!form.module || !form.topic || !form.question)
      return alert("Fill all required fields");

    if (form.type === "mcq") {
      if (form.options.some(o => !o)) return alert("Fill all options");
      if (!form.answer) return alert("Select correct answer");
    }

    addQuestion({
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });

    alert("✅ Question Added");

    setForm({
      module: "",
      topic: "",
      type: "mcq",
      company: "",
      question: "",
      options: ["", "", "", ""],
      answer: "",
      marks: 1,
      negativeMarks: 0,
      difficulty: "easy"
    });
  };

  const questions = getQuestions();

  const filtered = questions.filter(q =>
    q.question.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.module ? q.module === filters.module : true) &&
    (filters.difficulty ? q.difficulty === filters.difficulty : true) &&
    (filters.type ? q.type === filters.type : true)
  );

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="dashboard-main">
        <h1 className="page-title">Question Bank</h1>

        {/* 🔍 FILTER BAR */}
        <div className="filter-bar">
          <input
            placeholder="Search questions..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <select onChange={(e) => setFilters({ ...filters, module: e.target.value })}>
            <option value="">All Modules</option>
            {Object.keys(modules).map(m => <option key={m}>{m}</option>)}
          </select>

          <select onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}>
            <option value="">All Difficulty</option>
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>

          <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="">All Types</option>
            <option value="mcq">MCQ</option>
            <option value="short">Short</option>
            <option value="coding">Coding</option>
          </select>

          <button className="primary-btn">Search</button>
          <button className="secondary-btn" onClick={() => setFilters({ search:"", module:"", difficulty:"", type:"" })}>
            Reset
          </button>
        </div>

        {/* ➕ ADD QUESTION */}
        <div className="form-card">
          <h3>Add New Question</h3>

          <div className="form-section">
            <label>Basic Details</label>
            <div className="input-row">
              <div className="input-group">
                <label>Module</label>
                <select value={form.module} onChange={(e) => handleChange("module", e.target.value)}>
                  <option value="">Select</option>
                  {Object.keys(modules).map(m => <option key={m}>{m}</option>)}
                </select>
              </div>

              <div className="input-group">
                <label>Topic</label>
                <select value={form.topic} onChange={(e) => handleChange("topic", e.target.value)}>
                  <option value="">Select</option>
                  {form.module && modules[form.module].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="input-group">
                <label>Type</label>
                <select value={form.type} onChange={(e) => handleChange("type", e.target.value)}>
                  <option value="mcq">MCQ</option>
                  <option value="short">Short</option>
                  <option value="coding">Coding</option>
                </select>
              </div>

              <div className="input-group">
                <label>Company</label>
                <select value={form.company} onChange={(e) => handleChange("company", e.target.value)}>
                  <option value="">All</option>
                  {companies.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <label>Question</label>
            <textarea
              placeholder="Enter question..."
              value={form.question}
              onChange={(e) => handleChange("question", e.target.value)}
            />
          </div>

          {form.type === "mcq" && (
            <div className="form-section">
              <label>Options</label>
              <div className="input-row">
                {form.options.map((opt, i) => (
                  <input
                    key={i}
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="form-section">
            <label>Correct Answer / Keywords</label>
            <input
              placeholder="Correct answer"
              value={form.answer}
              onChange={(e) => handleChange("answer", e.target.value)}
            />
          </div>

          <div className="form-section">
            <label>Marking Scheme</label>
            <div className="input-row">
              <div className="input-group">
                <label>Marks</label>
                <select value={form.marks} onChange={(e) => handleChange("marks", Number(e.target.value))}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                </select>
              </div>

              <div className="input-group">
                <label>Negative Marks</label>
                <input
                  type="number"
                  value={form.negativeMarks}
                  onChange={(e) => handleChange("negativeMarks", Number(e.target.value))}
                />
              </div>

              <div className="input-group">
                <label>Difficulty</label>
                <select value={form.difficulty} onChange={(e) => handleChange("difficulty", e.target.value)}>
                  <option>easy</option>
                  <option>medium</option>
                  <option>hard</option>
                </select>
              </div>
            </div>
          </div>

          <button className="primary-btn" onClick={handleAdd}>
            Add Question
          </button>
        </div>

        {/* 📦 QUESTIONS */}
        <div className="question-grid">
          {filtered.map(q => (
            <div key={q.id} className="question-card">
              <div className="top">
                <small>{q.module} • {q.topic}</small>
                <button className="delete-btn" onClick={() => deleteQuestion(q.id)}>✕</button>
              </div>

              <p>{q.question}</p>

              <div className="meta">
                {q.type} | {q.difficulty} | {q.marks} marks
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionBank;