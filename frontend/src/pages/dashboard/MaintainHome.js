import React, { useState } from "react";
import { getUserProfile } from "../../utils/userProfile";
import "./MuscleGainHome.css"; // reuse styling

// --- Maintain Exercise Explanations and Videos ---
const exerciseDetails = {
  "Barbell Squats": {
    explanation: "Stand with feet shoulder-width apart, barbell resting on your upper back. Lower into a squat while keeping your back straight, then push through your heels to stand.",
    video: "https://www.youtube.com/embed/1oed-UmAxFs"
  },
  "Bench Press": {
    explanation: "Lie on a bench, grip the bar slightly wider than shoulder-width. Lower the bar to your chest, then press it upward until arms are extended.",
    video: "https://www.youtube.com/embed/gRVjAtPip0Y"
  },
  "Lat Pulldown": {
    explanation: "Sit at a lat pulldown machine, grip the bar wider than shoulder width, pull the bar to your upper chest and control back up.",
    video: "https://www.youtube.com/embed/CAwf7n6Luuc"
  },
  "Dumbbell Shoulder Press": {
    explanation: "Sit or stand holding dumbbells at shoulder height. Press them overhead until arms are extended.",
    video: "https://www.youtube.com/embed/B-aVuyhvLHU"
  },
  "Seated Row": {
    explanation: "Sit at a cable row machine, pull handles toward your lower chest, squeeze shoulder blades.",
    video: "https://www.youtube.com/embed/GZbfZ033f74"
  },
  "Barbell Curl": {
    explanation: "Stand with an underhand grip, curl the bar up to your shoulders, keeping elbows close.",
    video: "https://www.youtube.com/embed/kwG2ipFRgfo"
  },
  "Bodyweight Squats": {
    explanation: "Stand with feet shoulder-width apart. Lower your hips back and down, then return to standing.",
    video: "https://www.youtube.com/embed/aclHkVaku9U"
  },
  "Push-Ups": {
    explanation: "Keep your body straight, hands under shoulders. Lower your chest to just above the floor, then push back up.",
    video: "https://www.youtube.com/embed/IODxDxX7oi4"
  },
  "Pull-Ups": {
    explanation: "Hang from a bar with palms away, pull your chin over the bar. Use assistance if needed.",
    video: "https://www.youtube.com/embed/eGo4IYlbE5g"
  },
  "Plank": {
    explanation: "Support bodyweight on forearms and toes, keep body straight.",
    video: "https://www.youtube.com/embed/pSHjTRCQxIw"
  },
  "Walking Lunges": {
    explanation: "Lunge forward alternating legs, keep core tight.",
    video: "https://www.youtube.com/embed/QOVaHwm-Q6U"
  },
  "Band Rows": {
    explanation: "Anchor the band in front, pull handles toward hips, squeeze back.",
    video: "https://www.youtube.com/embed/2I69pVbPjJc"
  },
  "Band Chest Press": {
    explanation: "Anchor the band behind you at chest level, hold handles, and press forward.",
    video: "https://www.youtube.com/embed/1iB5ySptGdI"
  },
  "Band Shoulder Press": {
    explanation: "Stand on the band, hold handles at shoulders, press overhead.",
    video: "https://www.youtube.com/embed/5Xw2FQ7vQuc"
  },
  "Band Squats": {
    explanation: "Stand on the band holding handles at shoulders, perform squats.",
    video: "https://www.youtube.com/embed/7OZ9Cy0DkuI"
  }
};

// --- Maintain Exercise Split Definitions ---
const exercises = {
  "Full Body": {
    gym: [
      "Barbell Squats",
      "Bench Press",
      "Lat Pulldown",
      "Dumbbell Shoulder Press",
      "Seated Row",
      "Barbell Curl"
    ],
    resistance_band: [
      "Band Squats",
      "Band Chest Press",
      "Band Rows",
      "Band Shoulder Press",
      "Band Squats"
    ],
    no_equipment: [
      "Bodyweight Squats",
      "Push-Ups",
      "Pull-Ups",
      "Plank",
      "Walking Lunges"
    ]
  },
  "Upper Body": {
    gym: [
      "Bench Press",
      "Lat Pulldown",
      "Dumbbell Shoulder Press",
      "Seated Row",
      "Barbell Curl"
    ],
    resistance_band: [
      "Band Chest Press",
      "Band Rows",
      "Band Shoulder Press"
    ],
    no_equipment: [
      "Push-Ups",
      "Pull-Ups",
      "Plank"
    ]
  },
  "Lower Body": {
    gym: [
      "Barbell Squats",
      "Walking Lunges"
    ],
    resistance_band: [
      "Band Squats"
    ],
    no_equipment: [
      "Bodyweight Squats",
      "Walking Lunges"
    ]
  }
};

const DEFAULT_SETS = 3;
const weekDays = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

// Sample split: 3 days, simple full body, or 4 days upper/lower
function getSplit(trainingDays) {
  trainingDays = parseInt(trainingDays, 10);
  switch (trainingDays) {
    case 2:
      return [
        { label: weekDays[0], group: "Full Body" },
        { label: weekDays[3], group: "Full Body" }
      ];
    case 3:
      return [
        { label: weekDays[0], group: "Full Body" },
        { label: weekDays[2], group: "Full Body" },
        { label: weekDays[4], group: "Full Body" }
      ];
    case 4:
      return [
        { label: weekDays[0], group: "Upper Body" },
        { label: weekDays[1], group: "Lower Body" },
        { label: weekDays[3], group: "Upper Body" },
        { label: weekDays[4], group: "Lower Body" }
      ];
    case 5:
      return [
        { label: weekDays[0], group: "Full Body" },
        { label: weekDays[1], group: "Upper Body" },
        { label: weekDays[2], group: "Lower Body" },
        { label: weekDays[3], group: "Full Body" },
        { label: weekDays[4], group: "Upper Body" }
      ];
      case 6:
  return [
    { label: weekDays[0], group: "Upper Body" }, // Push
    { label: weekDays[1], group: "Lower Body" }, // Legs
    { label: weekDays[2], group: "Upper Body" }, // Pull
    { label: weekDays[3], group: "Lower Body" },
    { label: weekDays[4], group: "Upper Body" },
    { label: weekDays[5], group: "Lower Body" }
  ];
    default:
      return [
        { label: weekDays[0], group: "Full Body" },
        { label: weekDays[2], group: "Full Body" },
        { label: weekDays[4], group: "Full Body" }
      ];
  }
}

function getExercisesForGroup(group, equipment) {
  if (exercises[group] && exercises[group][equipment]) {
    return exercises[group][equipment];
  }
  return [];
}

const MaintainHome = ({ progress, setProgress, equipment, setEquipment }) => {
  const profile = getUserProfile();
  const trainingDays = profile?.trainingDays || 3;
  const split = getSplit(trainingDays);
  const [selectedDay, setSelectedDay] = React.useState(0);

  // Exercise popup state
  const [selectedExercise, setSelectedExercise] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(false);

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
      <h2>Maintenance Workout Calendar</h2>
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

export default MaintainHome;
export { getSplit, getExercisesForGroup };