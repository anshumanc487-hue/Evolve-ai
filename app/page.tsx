
"use client";

import { useEffect, useState } from "react";

type Habit = {
  name: string;
  done: boolean;
};

export default function Home() {
  const [tab, setTab] = useState("Home");
  const [xp, setXp] = useState(0);
  const [habits, setHabits] = useState<Habit[]>([
    { name: "Morning workout", done: false },
    { name: "Drink enough water", done: false },
    { name: "Confidence practice", done: false },
    { name: "Read for 20 minutes", done: false },
  ]);
  const [newHabit, setNewHabit] = useState("");
  const [workouts, setWorkouts] = useState<string[]>([]);
  const [workout, setWorkout] = useState("");
  const [meals, setMeals] = useState<string[]>([]);
  const [meal, setMeal] = useState("");
  const [seconds, setSeconds] = useState(1500);
  const [running, setRunning] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("evolve-data");
      if (saved) {
        const data = JSON.parse(saved);
        setXp(data.xp ?? 0);
        setHabits(data.habits ?? []);
        setWorkouts(data.workouts ?? []);
        setMeals(data.meals ?? []);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(
      "evolve-data",
      JSON.stringify({ xp, habits, workouts, meals })
    );
  }, [xp, habits, workouts, meals, loaded]);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds(s => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [running, seconds]);

  const completed = habits.filter(h => h.done).length;
  const progress = habits.length
    ? Math.round((completed / habits.length) * 100)
    : 0;

  const level = Math.floor(xp / 100) + 1;

  const sections = [
    "Home", "AI Coach", "Habits", "Workout",
    "Nutrition", "Physique", "Style",
    "Focus", "Challenges", "Analytics", "Profile"
  ];

  const card: React.CSSProperties = {
    background: "#171b29",
    border: "1px solid #292e40",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16
  };

  const button: React.CSSProperties = {
    background: "#8b5cf6",
    color: "white",
    border: 0,
    borderRadius: 10,
    padding: "12px 16px",
    cursor: "pointer",
    fontWeight: 600
  };

  const input: React.CSSProperties = {
    padding: 12,
    borderRadius: 10,
    background: "#101421",
    border: "1px solid #44485c",
    color: "white",
    width: "100%",
    marginBottom: 12,
    boxSizing: "border-box"
  };

  return (
    <main style={{
      background: "#0b0e18",
      color: "#f5f5ff",
      minHeight: "100vh",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: 900, margin: "auto" }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#a78bfa", marginBottom: 5 }}>
            ✦ EVOLVE AI
          </h1>
          <p style={{ color: "#a1a1b5" }}>
            Become your strongest self.
          </p>
        </header>

        <nav style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 16,
          marginBottom: 20
        }}>
          {sections.map(s => (
            <button
              key={s}
              onClick={() => setTab(s)}
              style={{
                ...button,
                whiteSpace: "nowrap",
                background: tab === s ? "#8b5cf6" : "#222638"
              }}
            >
              {s}
            </button>
          ))}
        </nav>

        <h2>{tab}</h2>

        {tab === "Home" && (
          <>
            <div style={card}>
              <h2>Welcome to your evolution 🚀</h2>
              <p>Small improvements. Extraordinary results.</p>
              <h3>Level {level}</h3>
              <h2>{xp} XP</h2>
              <p>Daily completion: {progress}%</p>
              <div style={{
                background: "#303447",
                height: 12,
                borderRadius: 20
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "#8b5cf6",
                  borderRadius: 20
                }} />
              </div>
            </div>
            <div style={card}>
              <h3>Today's Missions</h3>
              {habits.map((h, i) => (
                <p key={i}>
                  {h.done ? "✅" : "⭕"} {h.name}
                </p>
              ))}
              <button style={button} onClick={() => setTab("Habits")}>
                Complete Missions
              </button>
            </div>
          </>
        )}

        {tab === "Habits" && (
          <div style={card}>
            <h3>Daily Habit Tracker</h3>
            {habits.map((h, i) => (
              <label key={i} style={{
                display: "block",
                padding: "12px 0"
              }}>
                <input
                  type="checkbox"
                  checked={h.done}
                  onChange={() => {
                    const updated = [...habits];
                    updated[i] = { ...h, done: !h.done };
                    setHabits(updated);
                    setXp(x => Math.max(0, x + (h.done ? -20 : 20)));
                  }}
                />
                {" "}{h.name}
              </label>
            ))}
            <input
              style={input}
              placeholder="Add a new habit"
              value={newHabit}
              onChange={e => setNewHabit(e.target.value)}
            />
            <button style={button} onClick={() => {
              if (!newHabit.trim()) return;
              setHabits([...habits, {
                name: newHabit.trim(),
                done: false
              }]);
              setNewHabit("");
            }}>
              Add Habit
            </button>
          </div>
        )}

        {tab === "Workout" && (
          <div style={card}>
            <h3>Workout Tracker 💪</h3>
            <input
              style={input}
              placeholder="Example: Push-ups 3 sets x 15"
              value={workout}
              onChange={e => setWorkout(e.target.value)}
            />
            <button style={button} onClick={() => {
              if (!workout.trim()) return;
              setWorkouts([...workouts, workout.trim()]);
              setWorkout("");
              setXp(x => x + 30);
            }}>
              Save Workout +30 XP
            </button>
            {workouts.map((w, i) => <p key={i}>✓ {w}</p>)}
          </div>
        )}

        {tab === "Nutrition" && (
          <div style={card}>
            <h3>Nutrition Tracker 🥗</h3>
            <input
              style={input}
              placeholder="Example: Oats, milk, banana"
              value={meal}
              onChange={e => setMeal(e.target.value)}
            />
            <button style={button} onClick={() => {
              if (!meal.trim()) return;
              setMeals([...meals, meal.trim()]);
              setMeal("");
            }}>
              Log Meal
            </button>
            {meals.map((m, i) => <p key={i}>🍽️ {m}</p>)}
          </div>
        )}

        {tab === "Focus" && (
          <div style={card}>
            <h3>Deep Focus Mode 🧠</h3>
            <h1 style={{ fontSize: 52 }}>
              {String(Math.floor(seconds / 60)).padStart(2, "0")}:
              {String(seconds % 60).padStart(2, "0")}
            </h1>
            <button style={button} onClick={() => setRunning(!running)}>
              {running ? "Pause" : "Start Focus"}
            </button>
            {" "}
            <button style={button} onClick={() => {
              setRunning(false);
              setSeconds(1500);
            }}>
              Reset
            </button>
          </div>
        )}

        {tab === "AI Coach" && (
          <div style={card}>
            <h3>Your AI Confidence Coach</h3>
            <p>
              Build confidence through consistent practice,
              exercise, reflection, and achievable goals.
            </p>
            <p style={{ color: "#a78bfa" }}>
              Real AI conversations require an API connection.
            </p>
          </div>
        )}

        {["Physique", "Style"].includes(tab) && (
          <div style={card}>
            <h3>{tab} Analysis</h3>
            <p>Preview a photo privately on your device.</p>
            <input type="file" accept="image/*" />
            <p>
              Automated photo analysis will require a
              secure vision AI integration.
            </p>
          </div>
        )}

        {tab === "Challenges" && (
          <div style={card}>
            <h3>Daily Challenges 🏆</h3>
            <p>Complete habits to earn 20 XP each.</p>
            <p>Log workouts to earn 30 XP each.</p>
            <p>Current XP: {xp}</p>
          </div>
        )}

        {tab === "Analytics" && (
          <div style={card}>
            <h3>Your Progress 📊</h3>
            <p>Experience points: {xp}</p>
            <p>Level: {level}</p>
            <p>Habits completed: {completed}/{habits.length}</p>
            <p>Workouts logged: {workouts.length}</p>
            <p>Meals logged: {meals.length}</p>
          </div>
        )}

        {tab === "Profile" && (
          <div style={card}>
            <h3>My Profile</h3>
            <p>EVOLVE AI Member</p>
            <p>Level {level} • {xp} XP</p>
            <button style={button} onClick={() => {
              if (!confirm("Delete all saved progress?")) return;
              localStorage.removeItem("evolve-data");
              location.reload();
            }}>
              Delete My Local Data
            </button>
          </div>
        )}

        <footer style={{
          textAlign: "center",
          padding: 25,
          color: "#85859b"
        }}>
          EVOLVE AI © 2026 • Keep Evolving
        </footer>
      </div>
    </main>
  );
}
