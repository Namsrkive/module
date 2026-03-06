export default function TestInfoModal({ test, close }) {

  if (!test) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <h2>{test.name}</h2>

        <p>Questions: {test.questions}</p>
        <p>Duration: {test.duration}</p>
        <p>Difficulty: {test.level}</p>

        <button className="start-btn">
          Start Test
        </button>

        <button onClick={close}>Close</button>

      </div>

    </div>
  );
}