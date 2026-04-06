import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CompanyTests() {
  const { companyId } = useParams();
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/tests/company/${companyId}`)
      .then(res => res.json())
      .then(setTests);
  }, [companyId]);

  return (
    <div className="dashboard-main">

      <h2>Company Tests</h2>

      {tests.length === 0 && <p>No tests available</p>}

      {tests.map(test => (
        <div key={test._id} className="company-mock-card">

          <h3>{test.title}</h3>
          <p>Duration: {test.duration} min</p>
          <p>Questions: {test.questions.length}</p>

          <button onClick={() => navigate(`/test/start/${test._id}`)}>
            Start Test
          </button>

        </div>
      ))}

    </div>
  );
}