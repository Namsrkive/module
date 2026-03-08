import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getTests } from "../data/testStore";

import Timer from "../components/test/Timer";
import QuestionPanel from "../components/test/QuestionPanel";
import QuestionPalette from "../components/test/QuestionPalette";
import NavigationBar from "../components/test/NavigationBar";
import SectionSummary from "../components/test/SectionSummary";
import FinalReview from "../components/test/FinalReview";
import TestLayout from "../components/test/TestLayout";

import CodeEditor from "../components/test/CodeEditor";
import ProctorPanel from "../components/test/ProctorPanel";

import "../styles/test.css";

function TestPage() {

const navigate = useNavigate();

/* ================= STATES ================= */

const [currentSection,setCurrentSection] = useState(0);
const [currentQuestion,setCurrentQuestion] = useState(0);

const [answers,setAnswers] = useState({});
const [marked,setMarked] = useState([]);

const [showSummary,setShowSummary] = useState(false);
const [showFinalReview,setShowFinalReview] = useState(false);

/* ================= CURRENT SECTION ================= */

const section = sampleTest.sections[currentSection];

/* ================= HANDLE ANSWER ================= */

const handleSelect = (option)=>{

setAnswers({
...answers,
[`${currentSection}-${currentQuestion}`]:option
});

};

/* ================= MARK QUESTION ================= */

const toggleMark = ()=>{

const key = `${currentSection}-${currentQuestion}`;

if(marked.includes(key)){
setMarked(marked.filter(q=>q!==key));
}else{
setMarked([...marked,key]);
}

};

/* ================= NEXT SECTION ================= */

const goToNextSection = ()=>{
setShowSummary(true);
};

const handleContinue = ()=>{

setShowSummary(false);

if(currentSection < sampleTest.sections.length-1){

setCurrentSection(currentSection+1);
setCurrentQuestion(0);

}else{

setShowFinalReview(true);

}

};

/* ================= NAVIGATE SECTION ================= */

const handleGoToSection = (sectionIndex)=>{

setShowFinalReview(false);

setCurrentSection(sectionIndex);
setCurrentQuestion(0);

};

/* ================= SUBMIT TEST ================= */

const handleSubmit = ()=>{

let totalScore = 0;
let sectionScores = [];

sampleTest.sections.forEach((sec,secIndex)=>{

let secScore = 0;

sec.questions.forEach((q,qIndex)=>{

const key = `${secIndex}-${qIndex}`;

if(answers[key]===q.correctAnswer){
secScore++;
totalScore++;
}

});

sectionScores.push({
section:sec.name,
score:secScore,
total:sec.questions.length
});

});

navigate("/test-result",{
state:{totalScore,sectionScores}
});

};

/* ================= COUNTS ================= */

const answeredCount = section.questions.filter((_,index)=>{

const key = `${currentSection}-${index}`;
return answers[key];

}).length;

const markedCount = marked.filter((key)=>
key.startsWith(`${currentSection}-`)
).length;

/* ================= RENDER ================= */

const sampleTest = getTests()[0];

return(

<TestLayout>

{/* HEADER */}

<div className="tcs-header">

<h3>
{sampleTest.title} — {section.name}
</h3>

{!showSummary && !showFinalReview && (

<Timer
duration={section.duration}
onTimeUp={goToNextSection}
/>

)}

</div>

{/* FINAL REVIEW */}

{showFinalReview ? (

<FinalReview
sections={sampleTest.sections}
answers={answers}
marked={marked}
onGoToSection={handleGoToSection}
onFinalSubmit={handleSubmit}
/>

) : showSummary ? (

<SectionSummary
sectionName={section.name}
total={section.questions.length}
answeredCount={answeredCount}
markedCount={markedCount}
onContinue={handleContinue}
isLastSection={currentSection === sampleTest.sections.length-1}
/>

) : (

<>

{/* BODY */}

<div className="tcs-body">

{/* QUESTION PANEL */}

<div className="tcs-left">

<QuestionPanel
question={section.questions[currentQuestion]}
selected={answers[`${currentSection}-${currentQuestion}`]}
onSelect={handleSelect}
/>

{/* CODING QUESTION */}

{section.questions[currentQuestion].type==="coding" && (

<CodeEditor/>

)}

</div>

{/* RIGHT PANEL */}

<div className="tcs-right">

<QuestionPalette
total={section.questions.length}
current={currentQuestion}
answers={answers}
marked={marked}
setCurrent={setCurrentQuestion}
currentSection={currentSection}
/>

<ProctorPanel/>

</div>

</div>

{/* NAVIGATION */}

<NavigationBar
current={currentQuestion}
total={section.questions.length}
setCurrent={setCurrentQuestion}
toggleMark={toggleMark}
handleSubmit={goToNextSection}
isLastQuestion={currentQuestion === section.questions.length-1}
isLastSection={currentSection === sampleTest.sections.length-1}
/>

</>

)}

</TestLayout>

);

}

export default TestPage;