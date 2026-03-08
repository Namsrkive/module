import { useState } from "react";
import { tests } from "../../data/testStore";

function QuestionBank(){

const [question,setQuestion] = useState("");

const addQuestion = ()=>{

tests[0].sections.push({

name:"General",

questions:[{
question:question,
options:["A","B","C","D"],
correctAnswer:"A"
}]

});

alert("Question Added");

};

return(

<div>

<h2>Question Bank</h2>

<textarea
value={question}
onChange={(e)=>setQuestion(e.target.value)}
/>

<button onClick={addQuestion}>
Add Question
</button>

</div>

)

}

export default QuestionBank;