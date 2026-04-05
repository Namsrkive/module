import { useParams, useNavigate } from "react-router-dom";
import { getTestsByModuleTopic } from "../data/testStore";

export default function TopicTestList(){

  const { module, topic } = useParams();
  const navigate = useNavigate();

  const tests = getTestsByModuleTopic(module, topic);

  return (
    <div style={{ padding: "20px" }}>

      <h2>{module} - {topic}</h2>

      {tests.length === 0 && <p>No tests available</p>}

      {tests.map(test => (

        <div key={test.id} style={{
          border: "1px solid #ddd",
          padding: "15px",
          margin: "10px 0",
          borderRadius: "8px"
        }}>

          <h3>{test.name}</h3>

          <p>Difficulty: {test.difficulty}</p>
          <p>Duration: {test.duration} min</p>

          <button
            onClick={() => navigate(`/test/start/${test.id}`)}
          >
            Start Test
          </button>

        </div>

      ))}

    </div>
  );
}