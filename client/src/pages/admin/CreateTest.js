import { useState } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import { createTest } from "../../data/testStore"

function CreateTest(){

const [title,setTitle] = useState("")
const [duration,setDuration] = useState("")
const [type,setType] = useState("module")
const [difficulty,setDifficulty] = useState("medium")

const handleCreate = () => {

if(!title || !duration){
alert("Please fill all fields")
return
}

createTest({
name: title,
duration: Number(duration),
type,
difficulty
})

alert("Test created successfully")

setTitle("")
setDuration("")

}

return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1 className="page-title">Create New Test</h1>

<div className="builder-card">

<div className="form-row">

<div className="form-group">

<label>Test Name</label>

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder="Example: TCS Mock Test"
/>

</div>

<div className="form-group">

<label>Duration (minutes)</label>

<input
type="number"
value={duration}
onChange={(e)=>setDuration(e.target.value)}
placeholder="90"
/>

</div>

</div>

<div className="form-row">

<div className="form-group">

<label>Test Type</label>

<select
value={type}
onChange={(e)=>setType(e.target.value)}
>

<option value="module">Module Test</option>
<option value="company">Company Mock</option>

</select>

</div>

<div className="form-group">

<label>Difficulty</label>

<select
value={difficulty}
onChange={(e)=>setDifficulty(e.target.value)}
>

<option value="easy">Easy</option>
<option value="medium">Medium</option>
<option value="hard">Hard</option>

</select>

</div>

</div>

<button
className="primary-btn"
onClick={handleCreate}
>

Create Test

</button>

</div>

</div>

</div>

)

}

export default CreateTest