import { useState } from "react";

export default function Sidebar() {

  const [active,setActive] = useState("dashboard");

  const menu = [
  {id:"dashboard",label:"Dashboard",icon:"📊"},
  {id:"modules",label:"Module Tests",icon:"🧠"},
  {id:"company",label:"Company Mocks",icon:"🏢"},
  {id:"leaderboard",label:"Leaderboard",icon:"🏆"},
  {id:"analytics",label:"Analytics",icon:"📈"}
  ];

  return (

    <div className="sidebar">

      <div className="sidebar-top">

        <div className="sidebar-user">

          <h2>Welcome</h2>
          <p className="student-name">NAMRATA</p>

        </div>

        <div className="sidebar-divider">

          {menu.map(item=>(
            <div
              key={item.id}
              className={`menu-item ${active===item.id ? "active":""}`}
              onClick={()=>setActive(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}

        </div>

      </div>

      <div className="sidebar-bottom">

        <button
        className="logout-btn"
        onClick={()=> window.location.href="/login/student"}
        >
        🚪 Logout
        </button>

      </div>

    </div>

  );
}