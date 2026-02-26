import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
 
function App() {
  return (
<Router>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login/student" element={<StudentLogin />} />
<Route path="/login/admin" element={<AdminLogin />} />
<Route path="/dashboard/student" element={<StudentDashboard />} />
</Routes>
</Router>
  );
}
 
export default App;