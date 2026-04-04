function QuestionPalette({
  total,
  current,
  answers,
  marked,
  setCurrent,
  currentSection,
}) {
  return (
    <div className="palette">
      <h4>Question Palette</h4>

      <div className="palette-grid">
        {Array.from({ length: total }).map((_, index) => {
          const key = `${currentSection}-${index}`;

          let className = "not-answered";

          if (answers[key]) className = "answered";
          if (marked.includes(key)) className = "marked";
          if (index === current) className = "current"; // 🔥 highest priority

          return (
            <button
              key={index}
              className={`palette-btn ${className}`}
              onClick={() => setCurrent(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* 🔥 CLEAN LEGEND */}
      <div className="palette-legend">
        <span><span className="legend answered"></span> Answered</span>
        <span><span className="legend not-answered"></span> Not Answered</span>
        <span><span className="legend marked"></span> Marked</span>
        <span><span className="legend current"></span> Current</span>
      </div>
    </div>
  );
}

export default QuestionPalette;