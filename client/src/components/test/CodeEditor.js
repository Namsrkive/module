import Editor from "@monaco-editor/react";
import { useState } from "react";

function CodeEditor() {

const [language,setLanguage] = useState("java");
const [code,setCode] = useState("// Write your code here");

return(

<div className="code-editor">

<div className="editor-header">

<select
value={language}
onChange={(e)=>setLanguage(e.target.value)}
>

<option value="java">Java</option>
<option value="python">Python</option>
<option value="cpp">C++</option>
<option value="javascript">JavaScript</option>

</select>

<button className="run-btn">Run Code</button>

<button className="submit-btn">Submit</button>

</div>

<Editor
height="350px"
language={language}
value={code}
onChange={(value)=>setCode(value)}
theme="vs-dark"
/>

</div>

)

}

export default CodeEditor;