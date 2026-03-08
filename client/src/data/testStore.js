let tests = []
let questions = []

export const createTest = (test) => {
  tests.push(test)
}

export const getTests = () => tests

export const addQuestion = (question) => {
  questions.push(question)
}

export const getQuestions = () => questions

export const attachQuestionToTest = (testId, questionId) => {

const test = tests.find(t=>t.id===testId)
const question = questions.find(q=>q.id===questionId)

if(!test.questions) test.questions=[]

test.questions.push(question)

}

export const deleteTest = (id)=>{
tests = tests.filter(t=>t.id!==id)
}