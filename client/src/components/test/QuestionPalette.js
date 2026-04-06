function QuestionPalette({ questions, answers, current, setCurrent }) {
  return (
    <div className="question-palette">
      <h3>Question Palette</h3>

      <div className="palette-grid">
        {questions.map((q, i) => (
          <button
            key={i}
            className={`palette-btn 
              ${answers[i] ? "answered" : ""} 
              ${current === i ? "active" : ""}
            `}
            onClick={() => setCurrent(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionPalette;