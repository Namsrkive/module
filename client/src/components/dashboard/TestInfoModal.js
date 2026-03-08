export default function TestInfoModal({ test, close }) {

  if(!test) return null;

  return(

    <div className="modal-overlay">

      <div className="modal-card">

        <h2>{test.name}</h2>

        <p>{test.description}</p>

        <div className="test-details">

          <p>Questions: {test.questions}</p>
          <p>Duration: {test.duration}</p>
          <p>Difficulty: {test.level}</p>

        </div>

        <button
          className="start-test"
          onClick={()=> window.location.href=`/test/${test.route}`}
        >
          Start Test
        </button>

        <button
          className="close-modal"
          onClick={close}
        >
          Close
        </button>

      </div>

    </div>

  );

}