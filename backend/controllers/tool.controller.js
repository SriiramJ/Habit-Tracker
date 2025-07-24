import asyncHandler from "../utils/asyncHandler.js";

// BMI Calculator
export const getBMI = asyncHandler(async (req, res) => {
  const { weight, height } = req.body; // weight in kg, height in cm
  if (!weight || !height) {
    res.status(400);
    throw new Error("weight and height are required.");
  }
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";
  res.json({ bmi: parseFloat(bmi.toFixed(2)), category });
});

// BMR Calculator (Mifflin-St Jeor Equation)
export const getBMR = asyncHandler(async (req, res) => {
  const { weight, height, age, gender } = req.body;
  if (!weight || !height || !age || !gender) {
    res.status(400);
    throw new Error("weight, height, age, and gender are required.");
  }
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  res.json({ bmr: parseFloat(bmr.toFixed(2)) });
});

// Daily Caloric Needs (Harris-Benedict)
export const getDailyCalories = asyncHandler(async (req, res) => {
  const { bmr, activityLevel } = req.body;
  if (!bmr || !activityLevel) {
    res.status(400);
    throw new Error("bmr and activityLevel are required.");
  }
  const multipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
  };
  const calories = bmr * (multipliers[activityLevel] || 1.2);
  res.json({ dailyCalories: parseFloat(calories.toFixed(2)) });
});

// Ideal Weight Calculator (Devine Formula)
export const getIdealWeight = asyncHandler(async (req, res) => {
  const { height, gender } = req.body; // height in cm
  if (!height || !gender) {
    res.status(400);
    throw new Error("height and gender are required.");
  }
  let idealWeight;
  if (gender === "male") {
    idealWeight = 50 + 0.9 * (height - 152);
  } else {
    idealWeight = 45.5 + 0.9 * (height - 152);
  }
  res.json({ idealWeight: parseFloat(idealWeight.toFixed(2)) });
});

// Stopwatch (returns elapsed time in seconds)
let stopwatchStart = null;
export const startStopwatch = asyncHandler(async (req, res) => {
  stopwatchStart = Date.now();
  res.json({ message: "Stopwatch started." });
});
export const stopStopwatch = asyncHandler(async (req, res) => {
  if (!stopwatchStart) {
    res.status(400);
    throw new Error("Stopwatch not started.");
  }
  const elapsed = (Date.now() - stopwatchStart) / 1000;
  stopwatchStart = null;
  res.json({ elapsedSeconds: parseFloat(elapsed.toFixed(2)) });
});

// In-memory timer storage (for demo; use DB for production)
let timerStart = null;
let timerDuration = null;

// Start Timer
export const startTimer = asyncHandler(async (req, res) => {
  const { duration } = req.body; // duration in seconds
  if (!duration || typeof duration !== "number" || duration <= 0) {
    res.status(400);
    throw new Error("A positive duration (in seconds) is required.");
  }
  timerStart = Date.now();
  timerDuration = duration;
  res.json({ message: `Timer started for ${duration} seconds.` });
});

// Check Timer
export const checkTimer = asyncHandler(async (req, res) => {
  if (!timerStart || !timerDuration) {
    res.status(400);
    throw new Error("No timer running.");
  }
  const elapsed = (Date.now() - timerStart) / 1000;
  const remaining = Math.max(0, timerDuration - elapsed);
  const finished = remaining === 0;
  res.json({ finished, remainingSeconds: parseFloat(remaining.toFixed(2)) });
});
