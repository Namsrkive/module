import AdminSidebar from "../../components/admin/AdminSidebar";
import { useState } from "react";
import { addTest } from "../../data/testStore";

function CreateTest(){
const [name,setName] = useState("");
const [duration,setDuration] = useState("");

const createTest = ()=>{

const newTest = {

id:Date.now(),

title:name,

duration:duration,

sections:[]

};

addTest(newTest);

alert("Test Created");

};
return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1 className="page-title">Create Test</h1>

<div className="create-test-form">

<div className="form-group">
<label>Test Name</label>
<input type="text" placeholder="Enter test name"/>
</div>

<div className="form-group">
<label>Test Type</label>
<select>
<option>Module Test</option>
<option>Company Mock</option>
</select>
</div>

<div className="form-group">
<label>Module</label>
<select>
<option>Aptitude</option>
<option>DSA</option>
<option>DBMS</option>
<option>Programming</option>
</select>
</div>

<div className="form-group">
<label>Duration (minutes)</label>
<input type="number"/>
</div>

<button className="create-test-btn">
Create Test
</button>

</div>

</div>

</div>

)

}

export default CreateTest;