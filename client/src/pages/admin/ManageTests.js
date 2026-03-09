import AdminSidebar from "../../components/admin/AdminSidebar"
import { getTests, deleteTest } from "../../data/testStore"
import { useState } from "react"

function ManageTests(){

const [refresh,setRefresh] = useState(false)

const tests = getTests()

function handleDelete(id){

deleteTest(id)

setRefresh(!refresh)

}

return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1 className="page-title">Manage Tests</h1>

<div className="tests-grid">

{tests.map(t=>(

<div key={t.id} className="test-card">

<h3>{t.name}</h3>

<p>

Duration: {t.duration} min

</p>

<p>

Difficulty: {t.difficulty}

</p>

<p>

Questions: {t.questions?.length || 0}

</p>

<div className="test-actions">

<button className="secondary-btn">
Open Builder
</button>

<button className="secondary-btn">
Preview
</button>

<button
className="danger-btn"
onClick={()=>handleDelete(t.id)}
>

Delete

</button>

</div>

</div>

))}

</div>

</div>

</div>

)

}

export default ManageTests