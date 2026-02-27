import DashboardLayout from "../layouts/DashboardLayout";

function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <h2>My Performance Overview</h2>

      <div className="dashboard-grid">
        <div className="preview-card glow-card">
          <h4>Overall Readiness</h4>
          <p>78%</p>
        </div>

        <div className="preview-card glow-card">
          <h4>Tests Attempted</h4>
          <p>14</p>
        </div>

        <div className="preview-card glow-card">
          <h4>Strongest Module</h4>
          <p>Aptitude</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;