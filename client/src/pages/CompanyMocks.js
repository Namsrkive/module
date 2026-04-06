import Sidebar from "../components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/test.css";

export default function CompanyMocks(){

const navigate = useNavigate();

/* 🔥 NEW STATE */
const [companies, setCompanies] = useState([]);
const [testsMap, setTestsMap] = useState({});

/* 🔥 LOAD DATA */
useEffect(() => {
  const loadData = async () => {

    const res = await fetch("/api/companies");
    const companiesData = await res.json();

    setCompanies(companiesData);

    let map = {};

    for (let company of companiesData) {
      const testsRes = await fetch(`/api/tests/company/${company._id}`);
      const tests = await testsRes.json();

      map[company._id] = tests;
    }

    setTestsMap(map);
  };

  loadData();
}, []);

return(

<div className="dashboard-layout">

<Sidebar/>

<div className="dashboard-main">

<div className="test-page-header">
<h1>Company Mock Exams</h1>
<p>Attempt real company pattern tests</p>
</div>

<div className="company-mock-grid">

{companies.length === 0 && <p>No company tests available</p>}

{companies.map(company => {

const tests = testsMap[company._id] || [];

return(

<div key={company._id} className="company-mock-card">

<div className="company-header">
<h2>{company.name} Mock Test</h2>
<span>
{tests.length > 0 ? `${tests[0]?.duration || 30} min` : "--"}
</span>
</div>

<p>Tests Available: {tests.length}</p>

<p>
{tests.length > 0
? "Click to view tests"
: "No Tests Available"}
</p>

<button
className="start-mock-btn"
onClick={()=>{
  if(tests.length > 0){
    navigate(`/tests/company/${company._id}`);
  } else {
    alert("No tests available");
  }
}}
>
View Mocks
</button>

</div>

);

})}

</div>

</div>

</div>

);
}