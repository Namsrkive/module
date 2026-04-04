/* =========================
PERSISTENCE
========================= */

const loadTests = () => JSON.parse(localStorage.getItem("tests")) || []
const loadQuestions = () => JSON.parse(localStorage.getItem("questions")) || []
const loadResults = () => JSON.parse(localStorage.getItem("results")) || []

let tests = loadTests()
let questions = loadQuestions()
let results = loadResults()

/* =========================
HELPERS
========================= */

const saveTests = () => {
  localStorage.setItem("tests", JSON.stringify(tests))
}

const saveQuestions = () => {
  localStorage.setItem("questions", JSON.stringify(questions))
}

const saveResults = () => {
  localStorage.setItem("results", JSON.stringify(results))
}

/* =========================
TEST MANAGEMENT
========================= */

export const createTest = (test) => {

  const newTest = {
    id: Date.now(),
    name: test.name,
    duration: test.duration,
    type: test.type,
    difficulty: test.difficulty,

    // ✅ ADD THESE (IMPORTANT)
    module: test.module || "general",
    topic: test.topic || "mixed",

    isPublished: false,
    questions: []
  }

  tests.push(newTest)
  saveTests()
}
                     
export const getTests = () => {
  tests = loadTests()   // 🔥 important fix
  return tests
}

export const getPublishedTests = () => {
  return getTests().filter(t => t.isPublished);
}

export const deleteTest = (id) => {
  tests = tests.filter(t => t.id !== id)
  saveTests()
}

export const togglePublish = (id) => {
  tests = tests.map(t =>
    t.id === id ? { ...t, isPublished: !t.isPublished } : t
  )
  saveTests()
}

/* =========================
QUESTION MANAGEMENT
========================= */

export const addQuestion = (question) => {

  const newQuestion = {
    id: Date.now(),
    module: question.module,
    topic: question.topic,
    type: question.type,
    question: question.question,
    options: question.options,
    answer: question.answer
  }

  questions.push(newQuestion)
  saveQuestions()
}

export const getQuestions = () => {
  questions = loadQuestions()
  return questions
}

export const deleteQuestion = (id) => {
  questions = questions.filter(q => q.id !== id)
  saveQuestions()
}

/* =========================
FILTER QUESTIONS
========================= */

export const getQuestionsByModuleTopic = (module, topic) => {

  return getQuestions().filter(q =>
    q.module?.toLowerCase() === module?.toLowerCase() &&
    q.topic?.toLowerCase() === topic?.toLowerCase()
  )
}

/* =========================
ATTACH QUESTION TO TEST
========================= */

export const attachQuestionToTest = (testId, questionId) => {

  const test = tests.find(t => t.id === testId)
  const question = questions.find(q => q.id === questionId)

  if (!test || !question) return

  test.questions.push(question)
  saveTests()
}

/* =========================
AUTO GENERATE TEST
========================= */

export const generateTest = ({ testId, sections }) => {

  const test = tests.find(t => t.id === testId)

  if (!test) return

  test.questions = []

  sections.forEach(sec => {

    const filtered = questions.filter(
      q => q.module === sec.module && q.topic === sec.topic
    )

    const selected = filtered.slice(0, sec.count)

    test.questions.push(...selected)

  })

  saveTests()
}

/* =========================
RESULT STORE (FIXED)
========================= */

export const saveResult = (result) => {
  results.push({ ...result, id: Date.now() })
  saveResults()
}

export const getResults = () => {
  results = loadResults()
  return results
}

export const getResultsByStudent = (studentId) => {
  return getResults().filter(r => r.studentId === studentId)
}

export const getResultsByTest = (testId) => {
  return getResults().filter(r => r.testId === testId)
}