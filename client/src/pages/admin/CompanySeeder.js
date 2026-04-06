import AdminSidebar from "../../components/admin/AdminSidebar";
import { seedCompanyAPI } from "../../api/api";
import "../../styles/dashboard.css";

function CompanySeeder() {

  const companies = ["TCS", "IBM", "Accenture", "Wipro", "Deloitte"];

  const handleSeed = async (company) => {
    try {
      await seedCompanyAPI(company);
      alert(`✅ ${company} test created`);
    } catch (err) {
      alert("Error creating test");
    }
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="dashboard-main">
        <h1 className="page-title">Company Mock Tests</h1>

        <p className="dashboard-sub">
          Generate company-specific placement tests instantly
        </p>

        <div className="admin-grid">
          {companies.map((c) => (
            <div className="admin-card" key={c}>
              <h3>{c}</h3>
              <button
                className="btn-primary"
                onClick={() => handleSeed(c)}
              >
                Generate Test
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanySeeder;