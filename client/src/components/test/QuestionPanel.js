function QuestionPanel({ question, selected, onSelect }) {
  return (
    <div className="question-panel">
      <h3>{question.question}</h3>

      {question.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            checked={selected === option}
            onChange={() => onSelect(option)}
          />
          {option}
        </div>
      ))}
    </div>
  );
}

export default QuestionPanel;