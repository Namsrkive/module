import { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { Medal, Crown, Star } from "lucide-react"; 
import "../styles/result.css";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/analytics/leaderboard`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main loading">Calculating rankings...</div>
    </div>
  );

  const topThree = data.slice(0, 3);
  const remaining = data.slice(3);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <header className="leaderboard-header">
          <h1 className="page-title">Hall of Fame</h1>
          <p className="dashboard-sub">Top performing students across all assessments</p>
        </header>

        {data.length === 0 ? (
          <div className="empty-state-card">
            <Star size={48} />
            <p>The leaderboard is currently empty. Start a test to claim your spot!</p>
          </div>
        ) : (
          <>
            {/* TOP 3 PODIUM SECTION */}
            <div className="podium-container">
              {topThree[1] && (
                <div className="podium-item rank-2">
                  <div className="avatar-container">
                    <Medal className="medal-icon silver" />
                    <div className="podium-avatar">{topThree[1].name.charAt(0)}</div>
                  </div>
                  <span className="podium-name">{topThree[1].name}</span>
                  <span className="podium-score">{topThree[1].avgScore}%</span>
                  <div className="step step-2">2nd</div>
                </div>
              )}

              {topThree[0] && (
                <div className="podium-item rank-1">
                  <div className="avatar-container">
                    <Crown className="medal-icon gold" />
                    <div className="podium-avatar main">{topThree[0].name.charAt(0)}</div>
                  </div>
                  <span className="podium-name">{topThree[0].name}</span>
                  <span className="podium-score">{topThree[0].avgScore}%</span>
                  <div className="step step-1">1st</div>
                </div>
              )}

              {topThree[2] && (
                <div className="podium-item rank-3">
                  <div className="avatar-container">
                    <Medal className="medal-icon bronze" />
                    <div className="podium-avatar">{topThree[2].name.charAt(0)}</div>
                  </div>
                  <span className="podium-name">{topThree[2].name}</span>
                  <span className="podium-score">{topThree[2].avgScore}%</span>
                  <div className="step step-3">3rd</div>
                </div>
              )}
            </div>

            {/* REMAINING RANKINGS TABLE */}
            <div className="leaderboard-card">
              <table className="modern-leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Student Name</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {remaining.map((u, i) => (
                    <tr key={i}>
                      <td className="rank-cell">#{i + 4}</td>
                      <td className="name-cell">
                         <div className="table-user">
                            <div className="small-avatar">{u.name.charAt(0)}</div>
                            {u.name}
                         </div>
                      </td>
                      <td className="score-cell">
                        <div className="score-bar-mini">
                           <div className="fill" style={{ width: `${u.avgScore}%` }}></div>
                           <span>{u.avgScore}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}