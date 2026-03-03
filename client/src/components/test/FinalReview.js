function FinalReview({
  sections,
  answers,
  marked,
  onGoToSection,
  onFinalSubmit,
}) {
  return (
    <div className="summary-container">
      <h2>Final Test Review</h2>

      {sections.map((section, secIndex) => {
        const total = section.questions.length;

        const answeredCount = section.questions.filter(
          (_, qIndex) =>
            answers[`${secIndex}-${qIndex}`]
        ).length;

        const markedCount = marked.filter((key) =>
          key.startsWith(`${secIndex}-`)
        ).length;

        return (
          <div key={secIndex} className="summary-box">
            <h3>{section.name}</h3>
            <p>Total: {total}</p>
            <p>Answered: {answeredCount}</p>
            <p>Marked: {markedCount}</p>
            <p>Not Answered: {total - answeredCount}</p>

            <button
              className="secondary-btn"
              onClick={() => onGoToSection(secIndex)}
            >
              Review Section
            </button>
          </div>
        );
      })}

      <button
        className="primary-btn large"
        onClick={onFinalSubmit}
      >
        Final Submit Test
      </button>
    </div>
  );
}

export default FinalReview;