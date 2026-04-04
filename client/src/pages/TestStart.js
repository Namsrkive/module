import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsByModuleTopic } from "../data/testStore";
import "../styles/testStart.css";

function TestStart() {

const navigate = useNavigate();
const { module, topic } = useParams();

const questions = getQuestionsByModuleTopic(module, topic);

const startTest = async () => {

if (document.documentElement.requestFullscreen) {
await document.documentElement.requestFullscreen();
}

navigate(`/test/${module}/${topic}/attempt`);
};

return (

<div className="test-start-wrapper">

<div className="test-start-card">

<h1 className="test-title">
{module} - {topic}
</h1>

<div className="test-info-grid">

<div className="test-info">
⏱ Duration
<span>20 Minutes</span>
</div>

<div className="test-info">
📄 Questions
<span>{questions.length}</span>
</div>

<div className="test-info">
🚫 Tab Switch
<span>Not Allowed</span>
</div>

<div className="test-info">
📷 Proctoring
<span>Enabled</span>
</div>

</div>

<button
className="start-test-btn"
onClick={startTest}
>
Start Test
</button>

</div>

</div>

);
}

export default TestStart;