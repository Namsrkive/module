import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTestsByModuleTopic } from "../api/api";

export default function TopicTestList() {

  const { module, topic } = useParams();
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTests = async () => {
      try {
        const data = await fetchTestsByModuleTopic(module, topic);
        setTests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTests();
  }, [module, topic]);

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading tests...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h2>{module} - {topic}</h2>

      {tests.length === 0 ? (
        <p>No tests available</p>
      ) : (
        tests.map(test => (
          <div key={test._id} style={{
            border: "1px solid #ddd",
            padding: "15px",
            margin: "10px 0",
            borderRadius: "8px"
          }}>

            <h3>{test.name}</h3>

            <p>Difficulty: {test.difficulty}</p>
            <p>Duration: {test.duration} min</p>

            <button
              onClick={() => navigate(`/test/start/${test._id}`)}
            >
              Start Test
            </button>

          </div>
        ))
      )}

    </div>
  );
}