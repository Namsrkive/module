import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../styles/dashboard.css";

function AdminDashboard(){

return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1 className="page-title">Admin Control Center</h1>

<p className="dashboard-sub">
Manage tests, monitor students and analyze platform activity.
</p>

<div className="admin-grid">

<div className="admin-card">
<h3>Total Tests</h3>
<p>32 Active Tests</p>
</div>

<div className="admin-card">
<h3>Total Students</h3>
<p>148 Registered</p>
</div>

<div className="admin-card">
<h3>Tests Attempted</h3>
<p>523 Attempts</p>
</div>

<div className="admin-card">
<h3>System Status</h3>
<p>Operational</p>
</div>

</div>

</div>

</div>

)

}

export default AdminDashboard;