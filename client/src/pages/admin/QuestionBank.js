import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { addQuestionAPI, fetchQuestions } from "../../api/api";
import { 
  BookOpen, Award, Building2, ListChecks, Database, 
  Search, Filter, PlusCircle, CheckCircle2, Trash2, Edit3 
} from "lucide-react"; 
import "../../styles/adminForms.css";

function QuestionBank() {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const [form, setForm] = useState({
    module: "", topic: "", type: "mcq", company: "",
    question: "", options: ["", "", "", ""],
    answer: "", marks: 1, difficulty: "easy"
  });

  const modules = {
    Aptitude: ["Quant Basics", "Probability", "Number Series", "Logical Reasoning"],
    DSA: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
    DBMS: ["Normalization", "SQL Queries", "Transactions"],
    Programming: ["OOP", "Operating Systems", "Computer Networks"]
  };

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  const handleAdd = async () => {
    if (!form.module || !form.topic || !form.question || !form.answer) return alert("Fill all fields");
    try {
      await addQuestionAPI(form);
      alert("✅ Question saved successfully");
      const updated = await fetchQuestions();
      setQuestions(updated);
      setForm({ ...form, question: "", options: ["", "", "", ""], answer: "" });
    } catch (err) { alert("Error adding question"); }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === "all" || q.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <div className="dashboard-main">
        {/* Header Section */}
        <header className="page-header">
          <div className="header-text">
            <h1 className="page-title">Question Repository</h1>
            <p className="page-subtitle">Centralized database for all assessment content.</p>
          </div>
          <div className="header-meta">
            <span className="total-count-pill">
              <Database size={14} /> Total Items: {questions.length}
            </span>
          </div>
        </header>

        {/* 1. CREATE SECTION */}
        <div className="builder-card main-form-card">
          <div className="card-header-simple">
            <PlusCircle size={18} />
            <h2>Create New Question</h2>
          </div>

          <div className="form-inner-layout">
            {/* Metadata Sidebar */}
            <aside className="form-side-panel">
              <div className="panel-group">
                <label className="input-label"><BookOpen size={14}/> Module</label>
                <select className="modern-select" value={form.module} onChange={(e) => setForm({ ...form, module: e.target.value, topic: "" })}>
                  <option value="">Select Module</option>
                  {Object.keys(modules).map(m => <option key={m}>{m}</option>)}
                </select>
              </div>

              <div className="panel-group">
                <label className="input-label"><ListChecks size={14}/> Topic</label>
                <select className="modern-select" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} disabled={!form.module}>
                  <option value="">Select Topic</option>
                  {form.module && modules[form.module].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="panel-group">
                <label className="input-label"><Award size={14}/> Difficulty</label>
                <select className="modern-select" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="panel-group">
                <label className="input-label"><Building2 size={14}/> Target Company</label>
                <select className="modern-select" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}>
                  <option value="">General (No Company)</option>
                  <option>TCS</option><option>IBM</option><option>Accenture</option>
                  <option>Wipro</option><option>Deloitte</option>
                </select>
              </div>
            </aside>

            {/* Content Area */}
            <main className="form-main-content">
              <div className="form-group-full">
                <label className="input-label">Question Text</label>
                <textarea 
                  className="modern-textarea" 
                  placeholder="Type the detailed question scenario here..." 
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                />
              </div>

              <div className="options-grid-modern">
                {form.options.map((opt, i) => (
                  <div className="option-field" key={i}>
                    <span className="option-prefix">{String.fromCharCode(65 + i)}</span>
                    <input 
                       className="modern-input"
                       placeholder={`Option ${i + 1}`}
                       value={opt} 
                       onChange={(e) => {
                         const updated = [...form.options];
                         updated[i] = e.target.value;
                         setForm({ ...form, options: updated });
                       }} 
                    />
                  </div>
                ))}
              </div>

              <div className="form-group-full">
                <label className="input-label label-success">Correct Answer Identifier</label>
                <div className="ans-input-wrapper">
                   <CheckCircle2 size={18} className="ans-icon" />
                   <input 
                      className="modern-input ans-field" 
                      placeholder="Type the exact text of the correct option..." 
                      value={form.answer} 
                      onChange={(e) => setForm({ ...form, answer: e.target.value })} 
                   />
                </div>
              </div>

              <button className="btn-primary-glow" onClick={handleAdd}>Save Question to Bank</button>
            </main>
          </div>
        </div>

        {/* 2. INVENTORY SECTION */}
        <section className="inventory-section">
          <div className="inventory-header">
             <div className="header-left">
                <Database size={20} className="text-indigo" />
                <h2>Database Inventory</h2>
             </div>
             
             <div className="inventory-tools">
                <div className="modern-search">
                  <Search size={18} />
                  <input 
                    placeholder="Search by keyword or module..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="modern-filter">
                  <Filter size={16} />
                  <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
             </div>
          </div>

          <div className="questions-feed">
            {filteredQuestions.length === 0 ? (
              <div className="empty-feed">
                <p>No questions found matching your criteria.</p>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => (
                <div key={q._id || idx} className="feed-card">
                  <div className="feed-card-header">
                    <div className="feed-tags">
                      <span className="feed-tag module">{q.module}</span>
                      <span className="feed-tag topic">{q.topic}</span>
                      <span className={`feed-tag difficulty ${q.difficulty}`}>{q.difficulty}</span>
                      {q.company && <span className="feed-tag company">{q.company}</span>}
                    </div>
                    <div className="feed-actions">
                      <button className="icon-btn-subtle" title="Edit"><Edit3 size={16} /></button>
                      <button className="icon-btn-subtle danger" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <p className="feed-q-text">{q.question}</p>
                  <div className="feed-ans-bar">
                    <CheckCircle2 size={14} />
                    <span>Answer: <strong>{q.answer}</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default QuestionBank;