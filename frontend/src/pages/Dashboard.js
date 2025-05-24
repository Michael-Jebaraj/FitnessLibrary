import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import FatLossHome, { getSplit as getFatLossSplit, getExercisesForGroup as getFatLossExercises } from "./dashboard/FatLossHome";
import MuscleGainHome, { getSplit as getMuscleGainSplit, getExercisesForGroup as getMuscleGainExercises } from "./dashboard/MuscleGainHome";
import MaintainHome, { getSplit as getMaintainSplit, getExercisesForGroup as getMaintainExercises } from "./dashboard/MaintainHome";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const SETS_PER_EXERCISE = {
  fat_loss: 4,
  muscle_gain: 4,
  maintain: 3
};

const getSplitAndExerciseFunctions = (goal) => {
  switch (goal) {
    case "fat_loss":
      return { getSplit: getFatLossSplit, getExercises: getFatLossExercises };
    case "muscle_gain":
      return { getSplit: getMuscleGainSplit, getExercises: getMuscleGainExercises };
    case "maintain":
      return { getSplit: getMaintainSplit, getExercises: getMaintainExercises };
    default:
      return {};
  }
};

// Helper: Get the timestamp for the current week's Monday at 00:00
function getMondayOfCurrentWeek() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() + diff);
  return monday;
}

const Dashboard = () => {
  const navigate = useNavigate();

  // Get profile from localStorage
  const profile = JSON.parse(localStorage.getItem("userProfile"));
  const userId = profile?._id;

  // --- Progress state ---
  const [progress, setProgress] = useState(null);
  const [equipment, setEquipment] = useState("gym");

  // ---- Weekly progress reset logic (Only at/after 12:00 AM on Monday) ----
  useEffect(() => {
    if (userId) {
      const lastReset = localStorage.getItem("progressLastReset");
      const thisMonday = getMondayOfCurrentWeek().getTime();
      const now = new Date();

      // Only reset if:
      // 1. It is Monday (getDay() === 1)
      // 2. The time is after (or exactly) Monday 00:00
      // 3. The last reset is before this Monday
      if (
        now.getDay() === 1 &&
        now.getTime() >= thisMonday &&
        (!lastReset || Number(lastReset) < thisMonday)
      ) {
        setProgress({});
        localStorage.setItem("progressLastReset", String(thisMonday));
        localStorage.setItem("userProgress", JSON.stringify({}));
        axios.post(`https://fitnesslibrary.onrender.com/user/${userId}/progress`, { progress: {} });
      }
    }
  }, [userId]);

  // ---- Load progress from backend on mount ----
  useEffect(() => {
    if (userId) {
      axios
        .get(`https://fitnesslibrary.onrender.com/user/${userId}/progress`)
        .then((res) => {
          setProgress(res.data.progress || {});
          localStorage.setItem("userProgress", JSON.stringify(res.data.progress || {}));
        })
        .catch((err) => {
          const local = localStorage.getItem("userProgress");
          if (local) setProgress(JSON.parse(local));
        });
    }
  }, [userId]);

  // ---- Save progress to backend whenever it changes ----
  useEffect(() => {
    if (userId && progress !== null) {
      axios
        .post(`https://fitnesslibrary.onrender.com/user/${userId}/progress`, { progress })
        .then(() => {
          localStorage.setItem("userProgress", JSON.stringify(progress));
        })
        .catch((err) => console.error("Failed to save progress:", err));
    }
  }, [progress, userId]);

  const { getSplit, getExercises } = getSplitAndExerciseFunctions(profile?.goal || "fat_loss");
  const setsPerExercise = SETS_PER_EXERCISE[profile?.goal] || 4;

  const split = useMemo(() => {
    if (profile && getSplit) {
      return getSplit(profile.trainingDays);
    }
    return [];
  }, [profile, getSplit]);

  const overallStats = useMemo(() => {
    let totalSets = 0,
      doneSets = 0;
    split.forEach((day, idx) => {
      const exList = getExercises ? getExercises(day.group, equipment) : [];
      totalSets += exList.length * setsPerExercise;
      doneSets += exList.reduce(
        (sum, ex) => sum + ((progress?.[idx]?.[ex] || []).filter(Boolean).length),
        0
      );
    });
    return {
      totalSets,
      doneSets,
      percent: totalSets === 0 ? 0 : Math.round((doneSets / totalSets) * 100)
    };
  }, [progress, split, getExercises, equipment, setsPerExercise]);

  const dayProgress = useMemo(() => {
    return split.map((day, idx) => {
      const exList = getExercises ? getExercises(day.group, equipment) : [];
      const dayTotal = exList.length * setsPerExercise;
      const dayDone = exList.reduce(
        (sum, ex) => sum + ((progress?.[idx]?.[ex] || []).filter(Boolean).length),
        0
      );
      return {
        label: day.label,
        group: day.group,
        total: dayTotal,
        done: dayDone,
        percent: dayTotal === 0 ? 0 : Math.round((dayDone / dayTotal) * 100)
      };
    });
  }, [progress, split, getExercises, equipment, setsPerExercise]);

  if (!profile) {
    return <div>No profile found. Please complete your profile setup.</div>;
  }
  if (progress === null) {
    return <div>Loading progress...</div>;
  }

  const homeProps = {
    progress,
    setProgress,
    equipment,
    setEquipment
  };

  return (
    <div className="dashboard-bg">
      {/* AI Bot Icon OUTSIDE container */}
    
      <div className="dashboard-container">
        {/* Welcome Section */}
        <header className="dashboard-header">
          <h1>👋 Welcome back, {profile.name || "User"}!</h1>
        </header>

        {/* Profile Summary Card */}
        <section className="dashboard-profile-card">
          <h2>Your Stats</h2>
          <div className="dashboard-stats">
            <div>
              <strong>Age:</strong> {profile.age}
            </div>
            <div>
              <strong>Height:</strong> {profile.height} cm
            </div>
            <div>
              <strong>Weight:</strong> {profile.weight} kg
            </div>
            <div>
              <strong>Goal:</strong>{" "}
              {profile.goal
                ? profile.goal.replace("_", " ").toUpperCase()
                : "N/A"}
            </div>
          </div>
          <button
            className="dashboard-btn logout"
            onClick={() => {
              localStorage.removeItem("userProfile");
              localStorage.removeItem("userProgress");
              localStorage.removeItem("progressLastReset");
              navigate("/Home");
            }}
          >
            Log Out
          </button>
        </section>

        {/* Main Goal Section */}
        <section className="dashboard-goal-section">
          {/* ---- Overall Progress Bar ---- */}
          {/* ---- Home Section ---- */}
          {profile.goal === "fat_loss" && <FatLossHome {...homeProps} />}
          {profile.goal === "muscle_gain" && <MuscleGainHome {...homeProps} />}
          {profile.goal === "maintain" && <MaintainHome {...homeProps} />}
          <div className="dashboard-overall-progress">
            <h3>Overall Workout Progress</h3>
            <div className="dashboard-progress-bar">
              <div
                className="dashboard-progress"
                style={{ width: overallStats.percent + "%" }}
              ></div>
              <span className="dashboard-progress-label">
                {overallStats.doneSets} / {overallStats.totalSets} sets
                completed ({overallStats.percent}%)
              </span>
            </div>
            {/* Per-day summary */}
            <div className="dashboard-perday-table">
              {dayProgress.map((d, i) => (
                <div key={i} className="dashboard-perday-row">
                  <span className="dashboard-perday-label">{d.label}:</span>
                  <span className="dashboard-perday-sets">
                    {d.done} / {d.total} sets ({d.percent}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
