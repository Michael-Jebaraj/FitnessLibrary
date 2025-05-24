import React, { useState } from "react";
import { getUserProfile } from "../../utils/userProfile";
import "./MuscleGainHome.css";


// Add your exercise explanations and YouTube video links here
const exerciseDetails = {
  "Barbell Squats": {
    explanation:
      "Stand with feet shoulder-width apart, barbell resting on your upper back. Lower into a squat while keeping your back straight, then push through your heels to stand.",
    video: "https://youtube.com/shorts/MLoZuAkIyZI?si=6pBrkwROIuDNwYl2"
  },
  "Bench Press": {
    explanation:
      "Lie on a bench, grip the bar slightly wider than shoulder-width. Lower the bar to your chest, then press it upward until arms are extended.",
    video: "https://youtube.com/shorts/i-gLOirnPaU?si=n0yKJ1RB2GctBKWm"
  },
  "Lat Pulldown": {
    explanation:
      "Sit at a lat pulldown machine, grip the bar wider than shoulder-width. Pull the bar to your chest, squeezing your back, then slowly release.",
    video: "https://www.youtube.com/embed/CAwf7n6Luuc"
  },
  "Shoulder Press": {
    explanation:
      "Sit or stand with a barbell or dumbbells at shoulder height. Press the weight straight up overhead, then lower with control.",
    video: "https://www.youtube.com/embed/B-aVuyhvLHU"
  },
  "Leg Press": {
    explanation:
      "Use a leg press machine, feet shoulder-width on the platform. Lower the platform towards your chest, then push it back up.",
    video: "https://www.youtube.com/embed/IZxyjW7MPJQ"
  },
  "Cable Row": {
    explanation:
      "Sit at a cable row machine, grip the handle, and pull it towards your torso, squeezing your back, then slowly release.",
    video: "https://www.youtube.com/embed/GZbfZ033f74"
  },
  "Seated Row": {
    explanation:
      "Sit at the rowing machine, grip the handle, and pull it towards your abdomen, keeping your back straight, then release.",
    video: "https://www.youtube.com/embed/HJSVR_67OlM"
  },
  "Band Squats": {
    explanation:
      "Stand on the band, hold handles at shoulders. Squat while keeping tension in the band, then return to standing.",
    video: "https://www.youtube.com/embed/3p8EBPVZ2Iw"
  },
  "Band Chest Press": {
    explanation:
      "Anchor the band behind you at chest level, hold handles, and press forward until your arms are extended.",
    video: "https://www.youtube.com/embed/1iB5ySptGdI"
  },
  "Band Rows": {
    explanation:
      "Anchor the band in front, hold handles, and pull towards your hips, squeezing your back.",
    video: "https://www.youtube.com/embed/2I69pVbPjJc"
  },
  "Band Shoulder Press": {
    explanation:
      "Stand on the band, hold handles at shoulders, and press overhead.",
    video: "https://www.youtube.com/embed/5Xw2FQ7vQuc"
  },
  "Band Deadlifts": {
    explanation:
      "Stand on the band, hold handles, hinge at hips, and stand up straight.",
    video: "https://www.youtube.com/embed/7OZ9Cy0DkuI"
  },
  "Push-Ups": {
    explanation:
      "Keep your body straight, hands under shoulders. Lower your chest to just above the floor, then push back up.",
    video: "https://www.youtube.com/embed/IODxDxX7oi4"
  },
  "Bodyweight Squats": {
    explanation:
      "Stand with feet shoulder-width apart. Lower your hips back and down, then return to standing.",
    video: "https://www.youtube.com/embed/aclHkVaku9U"
  },
  "Lunges": {
    explanation:
      "Step forward with one leg, lower hips until both knees are bent at about a 90-degree angle. Push back to starting position.",
    video: "https://www.youtube.com/embed/QOVaHwm-Q6U"
  },
  "Plank to Push-Up": {
    explanation:
      "Start in a plank. Push up into a push-up position one arm at a time, then return to plank.",
    video: "https://www.youtube.com/embed/JKC2I6eBq1A"
  },
  "Pike Push-Ups": {
    explanation:
      "Start in a pike position (hips high), bend elbows lowering your head to the ground and push back up.",
    video: "https://www.youtube.com/embed/qHQ_E-f5278"
  },
  "Barbell Bench Press": {
    explanation:
      "Lie on a bench, grip the bar slightly wider than shoulders. Lower to your chest & press upward.",
    video: "https://youtu.be/5Y3VZsLb1Ys?si=VPv9JtXSa2x9HTZo"
  },
  "Incline Dumbbell Press": {
    explanation:
      "Lie on an incline bench, hold dumbbells above chest, lower to sides of chest, then press up.",
    video: "https://www.youtube.com/embed/8iPEnn-ltC8"
  },
  "Dumbbell Shoulder Press": {
    explanation:
      "Sit or stand with dumbbells at shoulders. Press overhead, then lower with control.",
    video: "https://www.youtube.com/embed/B-aVuyhvLHU"
  },
  "Tricep Rope Pushdown": {
    explanation:
      "Stand at a cable machine, grip rope, extend arms downward, squeezing triceps.",
    video: "https://www.youtube.com/embed/2-LAMcpzODU"
  },
  "Lateral Raise": {
    explanation:
      "Hold dumbbells at sides, raise arms to shoulder height, then lower.",
    video: "https://www.youtube.com/embed/3VcKaXpzqRo"
  },
  "Band Tricep Pushdown": {
    explanation:
      "Anchor band above, grip, and extend arms downward.",
    video: "https://www.youtube.com/embed/2-LAMcpzODU"
  },
  "Band Lateral Raise": {
    explanation:
      "Stand on band, hold handles at sides, raise arms to shoulder level.",
    video: "https://www.youtube.com/embed/3VcKaXpzqRo"
  },
  "Pike Push-Ups": {
    explanation:
      "Start in a pike position (hips high), bend elbows lowering your head to the ground and push back up.",
    video: "https://www.youtube.com/embed/qHQ_E-f5278"
  },
  "Diamond Push-Ups": {
    explanation:
      "Hands together under chest in a diamond shape. Lower and push up.",
    video: "https://www.youtube.com/embed/J0DnG1_S92I"
  },
  "Arm Circles": {
    explanation:
      "Extend arms and make small circles forward and backward.",
    video: "https://www.youtube.com/embed/3pD68uxRLkM"
  },
  "Seated Cable Row": {
    explanation:
      "Sit at row machine, pull cable to your stomach, squeezing shoulder blades.",
    video: "https://www.youtube.com/embed/HJSVR_67OlM"
  },
  "Barbell Curl": {
    explanation:
      "Stand holding a barbell, curl up to shoulders, lower with control.",
    video: "https://www.youtube.com/embed/kwG2ipFRgfo"
  },
  "Pull Ups": {
    explanation:
      "Hang from a bar, pull chin above bar, lower with control.",
    video: "https://www.youtube.com/embed/eGo4IYlbE5g"
  },
  "Face Pull": {
    explanation:
      "Using a cable at head height, pull towards your face, keeping elbows high.",
    video: "https://www.youtube.com/embed/eozdVDA78K0"
  },
  "Band Lat Pulldown": {
    explanation:
      "Anchor band high, kneel, pull band to chest, squeeze back.",
    video: "https://www.youtube.com/embed/CAwf7n6Luuc"
  },
  "Band Biceps Curl": {
    explanation:
      "Stand on band, grip handles, curl hands to shoulders.",
    video: "https://www.youtube.com/embed/kwG2ipFRgfo"
  },
  "Band Face Pull": {
    explanation:
      "Anchor band at face height, pull handles towards face.",
    video: "https://www.youtube.com/embed/eozdVDA78K0"
  },
  "Superman": {
    explanation:
      "Lie face down, extend arms and legs, lift off floor and hold.",
    video: "https://www.youtube.com/embed/z6PJMT2y8GQ"
  },
  "Reverse Snow Angels": {
    explanation:
      "Lie face down, arms overhead, move arms to sides and back.",
    video: "https://www.youtube.com/embed/54tTYO-vU2E"
  },
  "Chin-Ups": {
    explanation:
      "Hang under a bar, palms facing you, pull chin above bar.",
    video: "https://www.youtube.com/embed/b-ztMQpj8yc"
  },
  "Towel Curls": {
    explanation:
      "Hold a towel under your foot, curl up as resistance.",
    video: "https://www.youtube.com/embed/2sHh7yQKzJg"
  },
  "Leg Extension": {
    explanation:
      "Sit at the leg extension machine, extend knees, then lower.",
    video: "https://www.youtube.com/embed/YyvSfVjQeL0"
  },
  "Leg Curl": {
    explanation:
      "Lie face down on leg curl machine, curl heels to glutes.",
    video: "https://www.youtube.com/embed/1Tq3QdYUuHs"
  },
  "Calf Raise": {
    explanation:
      "Stand on a step, raise heels as high as possible, then lower.",
    video: "https://www.youtube.com/embed/-M4-G8p8fmc"
  },
  "Band Glute Bridge": {
    explanation:
      "Lie on back, band around thighs, lift hips upward.",
    video: "https://www.youtube.com/embed/8bbE64NuDTU"
  },
  "Band Leg Extension": {
    explanation:
      "Anchor band, attach to ankle, extend knee.",
    video: "https://www.youtube.com/embed/YyvSfVjQeL0"
  },
  "Band Deadlifts": {
    explanation:
      "Stand on band, hold handles, hinge at hips, stand up straight.",
    video: "https://www.youtube.com/embed/7OZ9Cy0DkuI"
  },
  "Glute Bridge": {
    explanation:
      "Lie on back, feet flat on floor, lift hips upward.",
    video: "https://www.youtube.com/embed/wPM8icPu6H8"
  },
  "Wall Sit": {
    explanation:
      "Lean against wall, slide down until knees are at 90°, hold.",
    video: "https://www.youtube.com/embed/-cdph8hv0O0"
  },
  "Band Fly": {
    explanation:
      "Anchor band behind, arms out to sides, bring hands together.",
    video: "https://www.youtube.com/embed/eozdVDA78K0"
  },
  "Bench Dips": {
    explanation:
      "Hands on bench behind you, feet forward, bend elbows to lower, then press up.",
    video: "https://www.youtube.com/embed/jox1rb5krQI"
  },
  "Hammer Curl": {
    explanation:
      "Hold dumbbells with palms facing in, curl up.",
    video: "https://www.youtube.com/embed/zC3nLlEvin4"
  },
  "Band Hammer Curl": {
    explanation:
      "Stand on band, grip handles, curl with palms facing in.",
    video: "https://www.youtube.com/embed/zC3nLlEvin4"
  },
  "Rear Delt Fly": {
    explanation:
      "Bend forward, dumbbells in hand, raise arms to sides.",
    video: "https://www.youtube.com/embed/pYcpY20QaE8"
  },
  "Handstand Hold": {
    explanation:
      "Kick into a handstand against a wall, hold position.",
    video: "https://www.youtube.com/embed/3P6w3lQpMv8"
  },
  "Dumbbell Curl": {
    explanation:
      "Hold dumbbells, curl up to shoulders, lower.",
    video: "https://www.youtube.com/embed/ykJmrZ5v0Oo"
  },
  "Tricep Rope Extension": {
    explanation:
      "Cable machine rope, extend arms overhead.",
    video: "https://www.youtube.com/embed/YbX7Wd8jQ-Q"
  },
  "Band Tricep Extension": {
    explanation:
      "Anchor band above, grip, and extend arms overhead.",
    video: "https://www.youtube.com/embed/YbX7Wd8jQ-Q"
  },
  "Bodyweight Curls (Isometric)": {
    explanation:
      "Hold a static curl position with tension.",
    video: "https://www.youtube.com/embed/kwG2ipFRgfo"
  },
  "Cable Crunch": {
    explanation:
      "Kneel at cable machine, rope overhead, crunch down.",
    video: "https://www.youtube.com/embed/zwf3hd1kQG8"
  },
  "Band Crunch": {
    explanation:
      "Anchor band above, kneel, crunch down.",
    video: "https://www.youtube.com/embed/zwf3hd1kQG8"
  },
  "Crunches": {
    explanation:
      "Lie on back, knees bent, lift shoulders towards ceiling.",
    video: "https://www.youtube.com/embed/Xyd_fa5zoEU"
  },
  "Bicycle Crunch": {
    explanation:
      "Lie on back, alternate touching opposite elbow to knee.",
    video: "https://www.youtube.com/embed/9FGilxCbdz8"
  },
  "Hanging Leg Raise": {
    explanation:
      "Hang from bar, lift legs up towards chest.",
    video: "https://www.youtube.com/embed/Dq7WZT5lC14"
  },
  "Decline Sit-Up": {
    explanation:
      "Lie on decline bench, sit up and lower down.",
    video: "https://www.youtube.com/embed/1fbU_MkV7NE"
  },
  "Band Russian Twist": {
    explanation:
      "Sit, hold band, rotate torso to sides.",
    video: "https://www.youtube.com/embed/wkD8rjkodUI"
  },
  "Band Leg Raise": {
    explanation:
      "Anchor band at feet, lie on back, raise legs.",
    video: "https://www.youtube.com/embed/Dq7WZT5lC14"
  },
  "Plank": {
    explanation:
      "Support bodyweight on forearms and toes, keep body straight.",
    video: "https://www.youtube.com/embed/pSHjTRCQxIw"
  },
  "Treadmill": {
    explanation:
      "Walk or run at a steady pace on the treadmill.",
    video: "https://www.youtube.com/embed/3OLOF6x2y6M"
  },
  "Elliptical": {
    explanation:
      "Step onto elliptical, stride smoothly, hold handles.",
    video: "https://www.youtube.com/embed/6Q1tZVxG2qA"
  },
  "Rowing Machine": {
    explanation:
      "Sit, strap feet, grab handle, push with legs, pull with arms.",
    video: "https://www.youtube.com/embed/6h5aZhUN6jQ"
  },
  "High Knees with Band": {
    explanation:
      "Wrap band around thighs, run in place with knees high.",
    video: "https://www.youtube.com/embed/OAJ_J3EZkdY"
  },
  "Squat to Press": {
    explanation:
      "Squat holding band, press overhead as you stand.",
    video: "https://www.youtube.com/embed/5Xw2FQ7vQuc"
  },
  "Jumping Jacks with Band": {
    explanation:
      "Band around thighs, perform jumping jacks.",
    video: "https://www.youtube.com/embed/UpH7rm0cYbM"
  },
  "Jumping Jacks": {
    explanation:
      "Jump feet out, raise arms overhead, then return.",
    video: "https://www.youtube.com/embed/c4DAnQ6DtF8"
  },
  "Burpees": {
    explanation:
      "Drop to squat, kick feet back, push-up, jump up.",
    video: "https://www.youtube.com/embed/TJp6r2KuZp8"
  },
  "Mountain Climbers": {
    explanation:
      "From push-up position, run knees towards chest.",
    video: "https://www.youtube.com/embed/cnyTQDSE884"
  }
};


const exercises = {
  FullBody: {
    gym: [
      "Barbell Squats",
      "Bench Press",
      "Lat Pulldown",
      "Shoulder Press",
      "Leg Press",
      "Cable Row",
      "Seated Row"
    ],
    resistance_band: [
      "Band Squats",
      "Band Chest Press",
      "Band Rows",
      "Band Shoulder Press",
      "Band Deadlifts"
    ],
    no_equipment: [
      "Push-Ups",
      "Bodyweight Squats",
      "Lunges",
      "Plank to Push-Up",
      "Pike Push-Ups"
    ]
  },
  "Push (Chest/Shoulders/Triceps)": {
    gym: [
      "Barbell Bench Press",
      "Incline Dumbbell Press",
      "Dumbbell Shoulder Press",
      "Tricep Rope Pushdown",
      "Lateral Raise"
    ],
    resistance_band: [
      "Band Chest Press",
      "Band Shoulder Press",
      "Band Tricep Pushdown",
      "Band Lateral Raise"
    ],
    no_equipment: [
      "Push-Ups",
      "Pike Push-Ups",
      "Diamond Push-Ups",
      "Arm Circles"
    ]
  },
  "Pull (Back/Biceps)": {
    gym: [
      "Lat Pulldown",
      "Seated Cable Row",
      "Barbell Curl",
      "Pull Ups",
      "Face Pull"
    ],
    resistance_band: [
      "Band Rows",
      "Band Lat Pulldown",
      "Band Biceps Curl",
      "Band Face Pull"
    ],
    no_equipment: [
      "Superman",
      "Reverse Snow Angels",
      "Chin-Ups",
      "Towel Curls"
    ]
  },
  Legs: {
    gym: [
      "Barbell Squats",
      "Leg Press",
      "Leg Extension",
      "Leg Curl",
      "Calf Raise"
    ],
    resistance_band: [
      "Band Squats",
      "Band Leg Extension",
      "Band Glute Bridge",
      "Band Deadlifts"
    ],
    no_equipment: [
      "Bodyweight Squats",
      "Lunges",
      "Glute Bridge",
      "Wall Sit"
    ]
  },
  "Upper Body": {
    gym: [
      "Barbell Bench Press",
      "Lat Pulldown",
      "Dumbbell Shoulder Press",
      "Seated Row",
      "Barbell Curl"
    ],
    resistance_band: [
      "Band Chest Press",
      "Band Row",
      "Band Shoulder Press",
      "Band Biceps Curl"
    ],
    no_equipment: [
      "Push-Ups",
      "Plank to Push-Up",
      "Arm Circles",
      "Chin-Ups"
    ]
  },
  "Lower Body": {
    gym: [
      "Barbell Squats",
      "Leg Press",
      "Leg Curl",
      "Calf Raise"
    ],
    resistance_band: [
      "Band Squats",
      "Band Leg Extension",
      "Band Glute Bridge"
    ],
    no_equipment: [
      "Bodyweight Squats",
      "Lunges",
      "Glute Bridge"
    ]
  },
  "Chest & Triceps": {
    gym: [
      "Barbell Bench Press",
      "Incline Dumbbell Press",
      "Tricep Rope Pushdown",
      "Overhead Dumbbell Extension"
    ],
    resistance_band: [
      "Band Chest Press",
      "Band Fly",
      "Band Tricep Pushdown"
    ],
    no_equipment: [
      "Push-Ups",
      "Diamond Push-Ups",
      "Bench Dips"
    ]
  },
  "Back & Biceps": {
    gym: [
      "Lat Pulldown",
      "Seated Row",
      "Barbell Curl",
      "Hammer Curl"
    ],
    resistance_band: [
      "Band Rows",
      "Band Biceps Curl",
      "Band Hammer Curl"
    ],
    no_equipment: [
      "Chin-Ups",
      "Towel Curls",
      "Superman"
    ]
  },
  Shoulders: {
    gym: [
      "Dumbbell Shoulder Press",
      "Lateral Raise",
      "Rear Delt Fly"
    ],
    resistance_band: [
      "Band Shoulder Press",
      "Band Lateral Raise",
      "Band Face Pull"
    ],
    no_equipment: [
      "Pike Push-Ups",
      "Arm Circles",
      "Handstand Hold"
    ]
  },
  Arms: {
    gym: [
      "Dumbbell Curl",
      "Tricep Rope Extension",
      "Barbell Curl"
    ],
    resistance_band: [
      "Band Biceps Curl",
      "Band Tricep Extension",
      "Band Hammer Curl"
    ],
    no_equipment: [
      "Diamond Push-Ups",
      "Chin-Ups",
      "Bodyweight Curls (Isometric)"
    ]
  },
  "Arms & Abs": {
    gym: [
      "Dumbbell Curl",
      "Tricep Rope Extension",
      "Cable Crunch"
    ],
    resistance_band: [
      "Band Biceps Curl",
      "Band Tricep Extension",
      "Band Crunch"
    ],
    no_equipment: [
      "Diamond Push-Ups",
      "Crunches",
      "Bicycle Crunch"
    ]
  },
  Abs: {
    gym: [
      "Cable Crunch",
      "Hanging Leg Raise",
      "Decline Sit-Up"
    ],
    resistance_band: [
      "Band Crunch",
      "Band Russian Twist",
      "Band Leg Raise"
    ],
    no_equipment: [
      "Crunches",
      "Plank",
      "Bicycle Crunch"
    ]
  },
  "Active Recovery/Cardio": {
    gym: [
      "Treadmill",
      "Elliptical",
      "Rowing Machine"
    ],
    resistance_band: [
      "High Knees with Band",
      "Squat to Press",
      "Jumping Jacks with Band"
    ],
    no_equipment: [
      "Jumping Jacks",
      "Burpees",
      "Mountain Climbers"
    ]
  }
};

const DEFAULT_SETS = 4;
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

// Map training days to a split, assigning days of the week
function getSplit(trainingDays) {
  trainingDays = parseInt(trainingDays, 10);
  switch (trainingDays) {
    case 2:
      return [
        { label: weekDays[0], group: "FullBody" },
        { label: weekDays[2], group: "FullBody" }
      ];
    case 3:
      return [
        { label: weekDays[0], group: "Push (Chest/Shoulders/Triceps)" },
        { label: weekDays[2], group: "Pull (Back/Biceps)" },
        { label: weekDays[4], group: "Legs" }
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
        { label: weekDays[0], group: "Chest & Triceps" },
        { label: weekDays[1], group: "Back & Biceps" },
        { label: weekDays[2], group: "Legs" },
        { label: weekDays[3], group: "Shoulders" },
        { label: weekDays[4], group: "Arms & Abs" }
      ];
    case 6:
      return [
        { label: weekDays[0], group: "Push (Chest/Shoulders/Triceps)" },
        { label: weekDays[1], group: "Pull (Back/Biceps)" },
        { label: weekDays[2], group: "Legs" },
        { label: weekDays[3], group: "Push (Chest/Shoulders/Triceps)" },
        { label: weekDays[4], group: "Pull (Back/Biceps)" },
        { label: weekDays[5], group: "Legs" }
      ];
    case 7:
      return [
        { label: weekDays[0], group: "Chest" },
        { label: weekDays[1], group: "Back" },
        { label: weekDays[2], group: "Shoulders" },
        { label: weekDays[3], group: "Legs" },
        { label: weekDays[4], group: "Arms" },
        { label: weekDays[5], group: "Abs" },
        { label: weekDays[6], group: "Active Recovery/Cardio" }
      ];
    default:
      return [
        { label: weekDays[0], group: "Push (Chest/Shoulders/Triceps)" },
        { label: weekDays[2], group: "Pull (Back/Biceps)" },
        { label: weekDays[4], group: "Legs" }
      ];
  }
}

function getExercisesForGroup(group, equipment) {
  if (exercises[group] && exercises[group][equipment]) {
    return exercises[group][equipment];
  }
  let muscleGroups = group
    .replace(/[()]/g, "")
    .replace("Push", "Chest/Shoulders/Triceps")
    .replace("Pull", "Back/Biceps")
    .split(/,|&|\/|and/i)
    .map((g) => g.trim());

  let exList = [];
  muscleGroups.forEach((mg) => {
    Object.keys(exercises).forEach((key) => {
      if (
        mg.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(mg.toLowerCase())
      ) {
        exList = exList.concat(exercises[key][equipment] || []);
      }
    });
  });
  return [...new Set(exList)];
}

const MuscleGainHome = ({ progress, setProgress, equipment, setEquipment }) => {
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
      <h2>Muscle Gain Workout Calendar</h2>
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
        ) : group.toLowerCase().includes("rest") || group.toLowerCase().includes("recovery") ? (
          <p style={{ color: "#888" }}>Rest & Recover</p>
        ) : (
          <ul className="exercise-list-grid">
            {exerciseList.map((ex) => (
              <li key={ex} className="exercise-row-grid">
                <button
                  type="button"
                  className="exercise-btn"
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
                  ({(progress[selectedDay]?.[ex] || []).filter(Boolean).length}/{DEFAULT_SETS})
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

export default MuscleGainHome;
export { getSplit, getExercisesForGroup };