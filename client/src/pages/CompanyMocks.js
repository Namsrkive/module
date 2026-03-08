import Sidebar from "../components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import "../styles/test.css";

const companies = [
  {
    name: "TCS",
    duration: "90 Minutes",
    sections: ["Aptitude", "Verbal", "Programming"],
  },

  {
    name: "IBM",
    duration: "75 Minutes",
    sections: ["Logical Reasoning", "DSA", "DBMS"],
  },

  {
    name: "Accenture",
    duration: "80 Minutes",
    sections: ["Aptitude", "Programming", "Logical"],
  },

  {
    name: "Wipro",
    duration: "85 Minutes",
    sections: ["Aptitude", "DBMS", "Operating Systems"],
  },

  {
    name: "Deloitte",
    duration: "70 Minutes",
    sections: ["Business Logic", "Programming", "Aptitude"],
  },
];

export default function CompanyMocks() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <div className="test-page-header">
          <h1>Company Mock Exams</h1>
          <p>
            Attempt full-length mock exams designed based on real company
            recruitment patterns.
          </p>
        </div>

        <div className="company-mock-grid">

          {companies.map((company) => (
            <div key={company.name} className="company-mock-card">

              <div className="company-header">
                <h2>{company.name} Mock Exam</h2>
                <span className="mock-duration">{company.duration}</span>
              </div>

              <div className="mock-sections">

                {company.sections.map((section) => (
                  <span key={section} className="mock-section">
                    {section}
                  </span>
                ))}

              </div>

              <button
                className="start-mock-btn"
                onClick={() => navigate("/test")}
              >
                Start Mock Exam
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}