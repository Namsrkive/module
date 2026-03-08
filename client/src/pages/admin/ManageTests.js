import AdminSidebar from "../../components/admin/AdminSidebar"
import { getTests,deleteTest } from "../../data/testStore"

function ManageTests(){

const tests = getTests()

return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1>Manage Tests</h1>

<div className="tests-grid">

{tests.length === 0 ? (
<p>No tests created yet</p>
) : (

tests.map((test)=>(
<div
key={test.id}
className="test-card"
>

<h3>{test.title}</h3>

<p>Duration: {test.duration} minutes</p>

<p>Questions: {test.questions?.length || 0}</p>

<button
className="delete-btn"
onClick={()=>deleteTest(test.id)}
>
Delete
</button>

</div>
))

)}

</div>

</div>

</div>

)

}

export default ManageTests;