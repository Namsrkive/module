function QuestionPanel({ question, selected, onSelect }) {
  return (
    <div className="question-panel">

      <div className="question-header">
        <h3>{question.question}</h3>
      </div>

      <div className="options">
        {question.options.map((option, index) => (
          <label key={index} className="option">
            <input
              type="radio"
              name="question"   // 🔥 important
              checked={selected === option}
              onChange={() => onSelect(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

    </div>
  );
}

export default QuestionPanel;