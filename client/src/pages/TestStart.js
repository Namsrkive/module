import { useParams, useNavigate } from "react-router-dom";
import { getTestById } from "../data/testStore";
import { useEffect } from "react";

export default function TestStart(){

  const { testId } = useParams();
  const navigate = useNavigate();

  const test = getTestById(testId);

  useEffect(() => {

    if(!test){
      alert("Test not found");
      navigate("/dashboard");
      return;
    }

    if(!test.questions || test.questions.length === 0){
      alert("Test has no questions");
      navigate("/dashboard");
      return;
    }

  }, [test, navigate]);

  if(!test) return null;

  return(

    <div style={{ padding: "40px" }}>

      <h1>{test.name}</h1>

      <p><b>Duration:</b> {test.duration} minutes</p>
      <p><b>Total Questions:</b> {test.questions.length}</p>
      <p><b>Total Marks:</b> {test.totalMarks}</p>
      <p><b>Difficulty:</b> {test.difficulty}</p>

      <button
        style={{
          padding: "12px 20px",
          marginTop: "20px",
          background: "#4CAF50",
          color: "#fff",
          border: "none",
          cursor: "pointer"
        }}
        onClick={() => navigate(`/test/${test.id}`)}
      >
        Start Test
      </button>

    </div>

  );
}