function SectionSummary({
  sectionName,
  total,
  answeredCount,
  markedCount,
  onContinue,
  isLastSection,
}) {
  return (
    <div className="summary-container">
      <h2>{sectionName} Summary</h2>

      <div className="summary-box">
        <p>Total Questions: {total}</p>
        <p>Answered: {answeredCount}</p>
        <p>Marked for Review: {markedCount}</p>
        <p>Not Answered: {total - answeredCount}</p>
      </div>

      <button className="primary-btn large" onClick={onContinue}>
        {isLastSection ? "Submit Test" : "Proceed to Next Section"}
      </button>
    </div>
  );
}

export default SectionSummary;