import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import "../styles/dashboard.css";

export default function AdminDashboard(){

const navigate = useNavigate();

return(

<div className="dashboard-layout">

<Sidebar/>

<div className="dashboard-main">

<h1 className="page-title">Admin Control Panel</h1>

<p className="dashboard-sub">
Manage tests, monitor student performance and configure the assessment system.
</p>

<div className="admin-grid">

<div
className="admin-card"
onClick={()=>navigate("/admin/create-test")}
>
<h3>Create Test</h3>
<p>Add module tests or company mock exams</p>
</div>

<div
className="admin-card"
onClick={()=>navigate("/admin/manage-tests")}
>
<h3>Manage Tests</h3>
<p>Edit or delete existing tests</p>
</div>

<div className="admin-card">
<h3>Student Results</h3>
<p>View student performance analytics</p>
</div>

<div className="admin-card">
<h3>Platform Analytics</h3>
<p>Track overall system statistics</p>
</div>

</div>

</div>

</div>

)

}