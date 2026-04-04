// ================= TEST ENGINE =================

/*
Evaluate answers
*/
export function evaluateTest(test, answers) {

  let score = 0;

  test.questions.forEach((q, index) => {

    const userAnswer = answers[index];
    const correctAnswer = q.correctAnswer;

    // 🔥 FIXED COMPARISON (handles string/number mismatch)
    if (
      userAnswer != null &&
      correctAnswer != null &&
      userAnswer.toString().trim() === correctAnswer.toString().trim()
    ) {
      score++;
    }

  });

  const total = test.questions.length;

  const accuracy =
    total > 0
      ? ((score / total) * 100).toFixed(1)
      : 0;

  return {
    score,
    total,
    accuracy
  };
}


/*
Submit Test
*/
export function submitTest({
  studentId,
  test,
  answers,
  violations = 0,
  timeTaken = 0
}) {

  const evaluation = evaluateTest(test, answers);

  const result = {
    id: Date.now(),
    studentId,
    testId: test.id,
    testTitle: test.title,
    score: evaluation.score,
    total: evaluation.total,
    accuracy: evaluation.accuracy,
    violations,
    timeTaken,
    date: new Date().toISOString()
  };

  // ❌ REMOVED saveResult (important fix)

  return result;
}