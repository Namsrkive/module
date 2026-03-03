function NavigationBar({
  current,
  total,
  setCurrent,
  toggleMark,
  handleSubmit,
  isLastQuestion,
  isLastSection,
}) {
  return (
    <div className="tcs-nav">
      <button
        disabled={current === 0}
        onClick={() => setCurrent(current - 1)}
      >
        Previous
      </button>

      <button onClick={toggleMark}>
        Mark for Review
      </button>

      {!isLastQuestion ? (
        <button onClick={() => setCurrent(current + 1)}>
          Next
        </button>
      ) : (
        <button className="submit-btn" onClick={handleSubmit}>
          {isLastSection ? "Submit Test" : "Next Section"}
        </button>
      )}
    </div>
  );
}

export default NavigationBar;