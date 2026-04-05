/* =========================
PERSISTENCE
========================= */

const loadTests = () => JSON.parse(localStorage.getItem("tests")) || [];
const loadQuestions = () => JSON.parse(localStorage.getItem("questions")) || [];
const loadResults = () => JSON.parse(localStorage.getItem("results")) || [];

let tests = loadTests();
let questions = loadQuestions();
let results = loadResults();

/* =========================
HELPERS
========================= */

const saveTests = () => localStorage.setItem("tests", JSON.stringify(tests));
const saveQuestions = () => localStorage.setItem("questions", JSON.stringify(questions));
const saveResults = () => localStorage.setItem("results", JSON.stringify(results));

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

    module: test.type === "module" ? test.module : null,
    topic: test.type === "module" ? test.topic : null,
    company: test.type === "company" ? test.company : null,

    questions: [],
    sections: [],
    totalMarks: 0,
    isPublished: true
  };

  tests.push(newTest);
  saveTests();
};

export const getTests = () => {
  tests = loadTests();
  return tests;
};

export const getPublishedTests = () => {
  return getTests().filter(t => t.isPublished);
};

export const deleteTest = (id) => {
  tests = tests.filter(t => t.id !== id);
  saveTests();
};

export const togglePublish = (id) => {
  tests = tests.map(t =>
    t.id === id ? { ...t, isPublished: !t.isPublished } : t
  );
  saveTests();
};

export function getTestById(id){
  return getTests().find(t => String(t.id) === String(id));
}

export function getTestsByModuleTopic(module, topic){
  return getTests().filter(
    t => t.type === "module" && t.module === module && t.topic === topic
  );
}

export function getCompanyTests(){
  return getTests().filter(t => t.type === "company");
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
    options: question.options || [],

    correctAnswer: question.correctAnswer,

    difficulty: question.difficulty || "easy",
    marks: question.marks || 1,
    negativeMarks: question.negativeMarks || 0,

    companyTags: question.companyTags || []
  };

  questions.push(newQuestion);
  saveQuestions();
};

export const getQuestions = () => {
  questions = loadQuestions();
  return questions;
};

export const deleteQuestion = (id) => {
  questions = questions.filter(q => q.id !== id);
  saveQuestions();
};

/* =========================
TEMP (OLD SUPPORT)
========================= */

export function getQuestionsByModuleTopic(module, topic){
  return getQuestions().filter(
    q => q.module === module && q.topic === topic
  );
}

/* =========================
SHUFFLE
========================= */

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

/* =========================
GENERATE TEST
========================= */

export const generateTest = ({ testId, sections }) => {

  const test = tests.find(t => t.id === testId);
  if(!test) return;

  test.questions = [];
  test.sections = sections;

  sections.forEach(sec => {

    let filtered = questions.filter(q =>
      q.module === sec.module &&
      (!sec.topic || q.topic === sec.topic) &&
      (!sec.difficulty || q.difficulty === sec.difficulty) &&
      (!sec.marks || q.marks === sec.marks) &&
      (!sec.company || q.companyTags.includes(sec.company))
    );

    filtered = shuffle(filtered);

    if(filtered.length < sec.count){
      filtered = shuffle(
        questions.filter(q => q.module === sec.module)
      );
    }

    test.questions.push(...filtered.slice(0, sec.count));
  });

  test.questions = shuffle(test.questions);

  test.totalMarks = test.questions.reduce(
    (sum,q)=>sum+(q.marks||1),
    0
  );

  saveTests();
};

/* =========================
EVALUATION
========================= */

export function evaluateTest(questions, answers){

  let score = 0;
  let correct = 0;

  questions.forEach((q,i)=>{

    const userAns = answers[i];

    if(userAns === q.correctAnswer){
      score += q.marks || 1;
      correct++;
    } else if(userAns){
      score -= q.negativeMarks || 0;
    }

  });

  return {
    score,
    total: questions.reduce((sum,q)=>sum+(q.marks||1),0),
    correct
  };
}

/* =========================
RESULTS (FIXED)
========================= */

export const saveResult = (result) => {
  results = loadResults();

  const newResult = {
    id: Date.now(),

    testId: result.testId || "local-test",
    userId: result.userId || "student1",

    score: result.score,
    total: result.total,
    correct: result.correct,
    wrong: result.wrong,
    attempted: result.attempted,

    answers: result.answers || {},
    questions: result.questions || [],

    module: result.module || "General",

    createdAt: new Date().toISOString()
  };

  results.push(newResult);
  saveResults();
};

export const getResults = () => {
  results = loadResults();
  return results;
};

export const clearResults = () => {
  localStorage.removeItem("results");
};

export const getGeneratedTest = () => {
  return JSON.parse(localStorage.getItem("generatedTest"));
};

