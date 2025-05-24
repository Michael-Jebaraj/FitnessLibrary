import React, { useState } from "react";
import { getUserProfile } from "../../utils/userProfile";
import "./MuscleGainHome.css"; // reuse CSS

// --- Weight Loss Exercise Explanations and Videos ---
const exerciseDetails = {
  "Treadmill Intervals": {
    explanation: "Alternate between 1 minute of fast running and 2 minutes of brisk walking on the treadmill.",
    video: "https://www.youtube.com/embed/6PBwSXHWv7E"
  },
  "Elliptical Intervals": {
    explanation: "Alternate between 1 minute of fast pace and 2 minutes of moderate pace on the elliptical.",
    video: "https://www.youtube.com/embed/6Q1tZVxG2qA"
  },
  "Rowing Sprints": {
    explanation: "Row as fast as possible for 30 seconds, then easy for 90 seconds. Repeat.",
    video: "https://www.youtube.com/embed/6h5aZhUN6jQ"
  },
  "Jump Rope": {
    explanation: "Jump continuously at a steady pace, resting as needed.",
    video: "https://www.youtube.com/embed/jy4Qk7m6Pxw"
  },
  "Burpees": {
    explanation: "Drop to squat, kick feet back, push-up, jump up.",
    video: "https://www.youtube.com/embed/TJp6r2KuZp8"
  },
  "Mountain Climbers": {
    explanation: "From push-up position, run knees towards chest.",
    video: "https://www.youtube.com/embed/cnyTQDSE884"
  },
  "Bodyweight Squats": {
    explanation: "Stand with feet shoulder-width apart. Lower your hips back and down, then return to standing.",
    video: "https://www.youtube.com/embed/aclHkVaku9U"
  },
  "Walking Lunges": {
    explanation: "Lunge forward alternating legs, keep core tight.",
    video: "https://www.youtube.com/embed/QOVaHwm-Q6U"
  },
  "Push-Ups": {
    explanation: "Keep your body straight, hands under shoulders. Lower your chest to just above the floor, then push back up.",
    video: "https://www.youtube.com/embed/IODxDxX7oi4"
  },
  "Plank": {
    explanation: "Support bodyweight on forearms and toes, keep body straight.",
    video: "https://www.youtube.com/embed/pSHjTRCQxIw"
  },
  "Jumping Jacks": {
    explanation: "Jump feet out, raise arms overhead, then return.",
    video: "https://www.youtube.com/embed/c4DAnQ6DtF8"
  },
  "High Knees": {
    explanation: "Run in place, driving knees high.",
    video: "https://www.youtube.com/embed/OAJ_J3EZkdY"
  },
  "Band Squat to Press": {
    explanation: "Squat holding resistance band, press overhead as you stand.",
    video: "https://www.youtube.com/embed/5Xw2FQ7vQuc"
  },
  "Band Rows": {
    explanation: "Anchor the band in front, pull handles toward hips, squeeze back.",
    video: "https://www.youtube.com/embed/2I69pVbPjJc"
  },
  "Band Chest Press": {
    explanation: "Anchor the band behind you at chest level, hold handles, and press forward.",
    video: "https://www.youtube.com/embed/1iB5ySptGdI"
  },
  "Band Deadlifts": {
    explanation: "Stand on the band, hold handles, hinge at hips, and stand up straight.",
    video: "https://www.youtube.com/embed/7OZ9Cy0DkuI"
  },
  "Band Mountain Climbers": {
    explanation: "Anchor band, attach to feet, perform mountain climbers.",
    video: "https://www.youtube.com/embed/cnyTQDSE884"
  }
};

// --- Weight Loss Exercise Split Definitions ---
const exercises = {
  "Full Body HIIT": {
    gym: [
      "Treadmill Intervals",
      "Elliptical Intervals",
      "Rowing Sprints",
      "Burpees",
      "Jump Rope"
    ],
    resistance_band: [
      "Band Squat to Press",
      "Band Rows",
      "Band Chest Press",
      "Band Deadlifts",
      "Band Mountain Climbers"
    ],
    no_equipment: [
      "Jumping Jacks",
      "Burpees",
      "Mountain Climbers",
      "Bodyweight Squats",
      "Walking Lunges",
      "Push-Ups",
      "Plank"
    ]
  },
  "Lower Body & Cardio": {
    gym: [
      "Treadmill Intervals",
      "Bodyweight Squats",
      "Walking Lunges",
      "Jump Rope"
    ],
    resistance_band: [
      "Band Squat to Press",
      "Band Deadlifts",
      "Band Mountain Climbers"
    ],
    no_equipment: [
      "Bodyweight Squats",
      "Walking Lunges",
      "Jumping Jacks",
      "High Knees"
    ]
  },
  "Upper Body & Core": {
    gym: [
      "Rowing Sprints",
      "Push-Ups",
      "Plank"
    ],
    resistance_band: [
      "Band Rows",
      "Band Chest Press",
      "Plank"
    ],
    no_equipment: [
      "Push-Ups",
      "Plank",
      "Mountain Climbers"
    ]
  },
  "Active Recovery": {
    gym: [
      "Elliptical Intervals",
      "Treadmill Intervals"
    ],
    resistance_band: [
      "Band Deadlifts",
      "Band Rows"
    ],
    no_equipment: [
      "Walking Lunges",
      "Plank"
    ]
  }
};

const DEFAULT_SETS = 4;
const weekDays = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

// Sample 4-day split for weight loss
function getSplit(trainingDays) {
  trainingDays = parseInt(trainingDays, 10);
  switch (trainingDays) {
    case 2:
      return [
        { label: weekDays[0], group: "Full Body HIIT" },
        { label: weekDays[3], group: "Full Body HIIT" }
      ];
    case 3:
      return [
        { label: weekDays[0], group: "Full Body HIIT" },
        { label: weekDays[2], group: "Lower Body & Cardio" },
        { label: weekDays[4], group: "Upper Body & Core" }
      ];
    case 4:
      return [
        { label: weekDays[0], group: "Full Body HIIT" },
        { label: weekDays[1], group: "Lower Body & Cardio" },
        { label: weekDays[3], group: "Upper Body & Core" },
        { label: weekDays[5], group: "Active Recovery" }
      ];
    case 5:
      return [
        { label: weekDays[0], group: "Full Body HIIT" },
        { label: weekDays[1], group: "Lower Body & Cardio" },
        { label: weekDays[2], group: "Upper Body & Core" },
        { label: weekDays[3], group: "Full Body HIIT" },
        { label: weekDays[5], group: "Active Recovery" }
      ];
    case 6:
      return [
        { label: weekDays[0], group: "Full Body HIIT" },
        { label: weekDays[1], group: "Lower Body & Cardio" },
        { label: weekDays[2], group: "Upper Body & Core" },
        { label: weekDays[3], group: "Full Body HIIT" },
        { label: weekDays[4], group: "Lower Body & Cardio" },
        { label: weekDays[5], group: "Active Recovery" }
      ];
    case 7:
      return [
        { label: weekDays[0], group: "Full Body HIIT" },
        { label: weekDays[1], group: "Lower Body & Cardio" },
        { label: weekDays[2], group: "Upper Body & Core" },
        { label: weekDays[3], group: "Full Body HIIT" },
        { label: weekDays[4], group: "Lower Body & Cardio" },
        { label: weekDays[5], group: "Upper Body & Core" },
        { label: weekDays[6], group: "Active Recovery" }
      ];
    default:
      return [
        { label: weekDays[0], group: "Full Body HIIT" },
        { label: weekDays[2], group: "Lower Body & Cardio" },
        { label: weekDays[4], group: "Upper Body & Core" }
      ];
  }
}

function getExercisesForGroup(group, equipment) {
  if (exercises[group] && exercises[group][equipment]) {
    return exercises[group][equipment];
  }
  return [];
}

const WeightLossHome = ({ progress, setProgress, equipment, setEquipment }) => {
  const profile = getUserProfile();
  const trainingDays = profile?.trainingDays || 3;
  const split = getSplit(trainingDays);
  const [selectedDay, setSelectedDay] = useState(0);

  // Exercise popup state
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const group = split[selectedDay]?.group;

  function handleExerciseClick(exercise) {
    setSelectedExercise(exercise);
    setShowPopup(true);
  }
  function closePopup() {
    setShowPopup(false);
    setSelectedExercise(null);
  }

  function handleSetCheck(ex, setIdx) {
    setProgress((prev) => {
      const day = prev[selectedDay] ? { ...prev[selectedDay] } : {};
      const sets = Array.isArray(day[ex]) ? [...day[ex]] : Array(DEFAULT_SETS).fill(false);
      sets[setIdx] = !sets[setIdx];
      day[ex] = sets;
      return {
        ...prev,
        [selectedDay]: day
      };
    });
  }

  // For progress bar calculation
  const exerciseList = group
    ? getExercisesForGroup(group, equipment)
    : [];
  const totalSets = exerciseList.length * DEFAULT_SETS;
  const doneSets = exerciseList.reduce(
    (sum, ex) =>
      sum +
      ((progress[selectedDay]?.[ex] || []).filter(Boolean).length),
    0
  );
  const percentDone =
    totalSets === 0 ? 0 : Math.round((doneSets / totalSets) * 100);

  return (
    <div className="mg-calendar-root">
      <h2>Weight Loss Workout Calendar</h2>
      <h2>Reps : 15</h2>
      <div className="mg-equipment-row">
        <span className="mg-equipment-label">Equipment:</span>
        <select
          className="mg-equipment-select"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
        >
          <option value="gym">Gym</option>
          <option value="resistance_band">Resistance Band</option>
          <option value="no_equipment">No Equipment</option>
        </select>
      </div>
      <div className="mg-calendar-week">
        {split.map((d, idx) => (
          <button
            key={d.label}
            className={`mg-calendar-day-btn${selectedDay === idx ? " selected" : ""}`}
            onClick={() => setSelectedDay(idx)}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="mg-calendar-details">
        <h4>
          {split[selectedDay]?.label} - <span style={{ fontWeight: 400 }}>{group}</span>
        </h4>
        {/* Progress Bar */}
        {exerciseList.length > 0 && (
          <div className="mg-progress-bar">
            <div
              className="mg-progress"
              style={{ width: percentDone + "%" }}
            ></div>
            <span className="mg-progress-label">
              {doneSets} / {totalSets} sets completed ({percentDone}%)
            </span>
          </div>
        )}
        {!group ? (
          <p style={{ color: "#888" }}>No workout scheduled.</p>
        ) : (
          <ul className="exercise-list-grid">
            {exerciseList.map((ex) => (
              <li key={ex} className="exercise-row-grid">
                <button
                  type="button"
                  className="exercise-btn"
                  title={ex}
                  onClick={() => handleExerciseClick(ex)}
                >
                  {ex}
                </button>
                <div className="sets-grid">
                  {[...Array(DEFAULT_SETS)].map((_, i) => (
                    <label key={i} className="set-checkbox-label">
                      <input
                        type="checkbox"
                        checked={
                          (progress[selectedDay]?.[ex] || [])[i] || false
                        }
                        onChange={() => handleSetCheck(ex, i)}
                      />
                      <span className="set-num">{i + 1}</span>
                    </label>
                  ))}
                </div>
                <span className="sets-counter">
                  {(progress[selectedDay]?.[ex] || []).filter(Boolean).length}/{DEFAULT_SETS}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showPopup && selectedExercise && (
        <div className="exercise-popup-overlay" onClick={closePopup}>
          <div className="exercise-popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-popup"
              onClick={closePopup}
              aria-label="Close"
            >
              &times;
            </button>
            <h3>{selectedExercise}</h3>
            <p>
              {(exerciseDetails[selectedExercise] &&
                exerciseDetails[selectedExercise].explanation) ||
                "Description coming soon!"}
            </p>
            {exerciseDetails[selectedExercise] &&
              exerciseDetails[selectedExercise].video && (
                <div className="exercise-video-container">
                  <iframe
                    width="100%"
                    height="220"
                    src={exerciseDetails[selectedExercise].video}
                    title={selectedExercise}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: "8px", marginTop: "14px" }}
                  ></iframe>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeightLossHome;
export { getSplit, getExercisesForGroup };