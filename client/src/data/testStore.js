/* =========================
PERSISTENCE
========================= */

let tests = JSON.parse(localStorage.getItem("tests")) || []
let questions = JSON.parse(localStorage.getItem("questions")) || []

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
questions:[]
}

tests.push(newTest)

localStorage.setItem("tests", JSON.stringify(tests))

}

export const getTests = () => tests

export const deleteTest = (id)=>{

tests = tests.filter(t=>t.id!==id)

localStorage.setItem("tests", JSON.stringify(tests))

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

localStorage.setItem("questions", JSON.stringify(questions))

}

export const getQuestions = () => questions

export const deleteQuestion = (id)=>{

questions = questions.filter(q=>q.id!==id)

localStorage.setItem("questions", JSON.stringify(questions))

}


/* =========================
FILTER QUESTIONS
========================= */

export const getQuestionsByModuleTopic = (module, topic) => {

return questions.filter(q => 
q.module?.toLowerCase() === module?.toLowerCase() &&
q.topic?.toLowerCase() === topic?.toLowerCase()
)

}

/* =========================
ATTACH QUESTION TO TEST
========================= */

export const attachQuestionToTest = (testId, questionId) => {

const test = tests.find(t=>t.id===testId)
const question = questions.find(q=>q.id===questionId)

if(!test || !question) return

test.questions.push(question)

localStorage.setItem("tests", JSON.stringify(tests))

}


/* =========================
AUTO GENERATE TEST
========================= */

export const generateTest = ({testId,sections})=>{

const test = tests.find(t=>t.id===testId)

if(!test) return

test.questions = []

sections.forEach(sec=>{

const filtered = questions.filter(
q => q.module === sec.module && q.topic === sec.topic
)

const selected = filtered.slice(0,sec.count)

test.questions.push(...selected)

})

localStorage.setItem("tests",JSON.stringify(tests))

}

// RESULT STORE
let results = [];

export function saveResult(result) {
  results.push(result);
}

export function getResults() {
  return results;
}

export function getResultsByStudent(studentId) {
  return results.filter(r => r.studentId === studentId);
}

export function getResultsByTest(testId) {
  return results.filter(r => r.testId === testId);
}