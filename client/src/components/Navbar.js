import { useNavigate } from "react-router-dom";
 
function Navbar({ toggleDarkMode }) {
  const navigate = useNavigate();
 
  return (
<div className="navbar">
<div className="nav-title" onClick={() => navigate("/dashboard")}>
        Placement Portal
</div>
 
      <button className="nav-btn" onClick={toggleDarkMode}>
        Toggle Dark Mode
</button>
</div>
  );
}
 
export default Navbar;
