import { useState } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import { getTests, generateTest } from "../../data/testStore"

function TestBuilder(){

const tests = getTests()

const modules = {
Aptitude:["Quant Basics","Probability","Number Series","Logical Reasoning"],
DSA:["Arrays","Trees","Graphs","Dynamic Programming"],
DBMS:["Normalization","SQL Queries","Transactions"],
Programming:["OOP","Operating Systems","Computer Networks"]
}

const [selectedTest,setSelectedTest] = useState("")

const [sections,setSections] = useState([
{module:"",topic:"",count:5}
])

function handleSectionChange(index,key,value){

const updated=[...sections]
updated[index][key]=value
setSections(updated)

}

function addSection(){

setSections([...sections,{module:"",topic:"",count:5}])

}

function removeSection(index){

const updated = sections.filter((_,i)=>i!==index)
setSections(updated)

}


function handleGenerate(){

if(!selectedTest){
alert("Select a test first")
return
}

generateTest({
testId:selectedTest,
sections
})

alert("Test Generated")

}

return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1 className="page-title">Test Builder</h1>

<div className="builder-card">

{/* SELECT TEST */}

<div className="form-group">

<label>Select Test</label>

<select
value={selectedTest}
onChange={(e)=>setSelectedTest(Number(e.target.value))}
>

<option value="">Select Test</option>

{tests.map(t=>(
<option key={t.id} value={t.id}>
{t.name}
</option>
))}

</select>

</div>

<h3>Test Sections</h3>

{sections.map((sec,index)=>(

<div key={index} className="section-card">

<div className="section-header">

<h4>Section {index+1}</h4>

<button
className="remove-section-btn"
onClick={()=>removeSection(index)}
>
✕
</button>

</div>

<div className="section-grid">

<select
value={sec.module}
onChange={(e)=>handleSectionChange(index,"module",e.target.value)}
>
<option value="">Select Module</option>

{Object.keys(modules).map(m=>(
<option key={m}>{m}</option>
))}

</select>

<select
value={sec.topic}
onChange={(e)=>handleSectionChange(index,"topic",e.target.value)}
>

<option value="">Select Topic</option>

{sec.module &&
modules[sec.module].map(t=>(
<option key={t}>{t}</option>
))}

</select>

<input
type="number"
value={sec.count}
onChange={(e)=>handleSectionChange(index,"count",Number(e.target.value))}
/>

</div>

</div>

))}

<button
className="secondary-btn"
onClick={addSection}
>

Add Section

</button>

<button
className="primary-btn"
onClick={handleGenerate}
>

Generate Test

</button>

</div>

</div>

</div>

)

}

export default TestBuilder