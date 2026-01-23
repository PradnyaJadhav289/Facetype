import React, { useEffect, useState } from "react";
import { getSessions } from "../services/api";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await getSessions();
      setSessions(res.data);
    };

    fetchSessions();
  }, []);

  const totalSessions = sessions.length;
  const totalCharacters = sessions.reduce(
    (acc, session) => acc + (session.typedText?.length || 0),
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📊 Session Dashboard</h1>

      {/* Summary Section */}
      <div style={styles.summaryContainer}>
        <div style={styles.summaryCard}>
          <h3>Total Sessions</h3>
          <p style={styles.summaryValue}>{totalSessions}</p>
        </div>

        <div style={styles.summaryCard}>
          <h3>Total Characters Typed</h3>
          <p style={styles.summaryValue}>{totalCharacters}</p>
        </div>
      </div>

      {/* Session List */}
      <div style={styles.sessionsContainer}>
        {sessions.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No sessions available yet.</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div key={session._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.sessionId}>
                  Session ID: {session._id.slice(-6)}
                </span>
                <span style={styles.duration}>
                  ⏱ {session.duration}s
                </span>
              </div>

              <div style={styles.cardBody}>
                <p style={styles.textLabel}>Typed Text:</p>
                <div style={styles.textBox}>
                  {session.typedText || "No text recorded"}
                </div>
              </div>

              <div style={styles.cardFooter}>
                <span>
                  🕒 {new Date(session.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
