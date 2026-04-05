import Sidebar from "../components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCompanyTests } from "../data/testStore";
import "../styles/test.css";

export default function CompanyMocks(){

const navigate = useNavigate();
const tests = getCompanyTests();

return(

<div className="dashboard-layout">

<Sidebar/>

<div className="dashboard-main">

<div className="test-page-header">
<h1>Company Mock Exams</h1>
<p>Attempt real company pattern tests</p>
</div>

<div className="company-mock-grid">

{tests.length === 0 && <p>No company tests available</p>}

{tests.map(test => (

<div key={test.id} className="company-mock-card">

<div className="company-header">
<h2>{test.company} Mock Test</h2>
<span>{test.duration} min</span>
</div>

<p>Questions: {test.questions.length}</p>
<p>Total Marks: {test.totalMarks}</p>
<p>Difficulty: {test.difficulty}</p>

<button
className="start-mock-btn"
onClick={()=>navigate(`/test/start/${test.id}`)}
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