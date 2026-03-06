import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Sidebar() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="sidebar">

      <h2 className="logo">Placement Portal</h2>

      <nav>
        <a href="/dashboard/student">Dashboard</a>
        <a href="/tests/modules">Module Tests</a>
        <a href="/tests/company">Company Mocks</a>
        <a href="/leaderboard">Leaderboard</a>
        <a href="/analytics">Analytics</a>
      </nav>

      <div className="sidebar-bottom">
        <button onClick={toggleTheme}>🌗 Toggle Theme</button>
        <button className="logout">Logout</button>
      </div>

    </div>
  );
}