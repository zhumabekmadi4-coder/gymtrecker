"use client";

import { useState, useEffect, useCallback } from "react";
import { achievements, levels, workoutDays } from "../data/workouts";

export interface SetLog {
  reps: number;
  weight: string;
  done: boolean;
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: SetLog[];
  actualWeight: string;
}

export interface WorkoutLog {
  day: number;
  date: string;
  exercises: ExerciseLog[];
  completed: boolean;
  totalXp: number;
  type: "main" | "recovery";
  recoveryId?: string;
}

export interface UserState {
  currentDay: number;
  xp: number;
  streak: number;
  lastWorkoutDate: string | null;
  workoutLogs: WorkoutLog[];
  unlockedAchievements: string[];
  weightUps: number;
}

export interface ExerciseHistory {
  date: string;
  day: number;
  weight: string;
  sets: SetLog[];
}

const DEFAULT_STATE: UserState = {
  currentDay: 1,
  xp: 0,
  streak: 0,
  lastWorkoutDate: null,
  workoutLogs: [],
  unlockedAchievements: [],
  weightUps: 0,
};

// Get ISO week number (Mon=start)
function getWeekKey(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const monday = new Date(d.setDate(diff));
  return monday.toISOString().split("T")[0];
}

// Count consecutive weeks with 3+ main workouts, ending at current week
function calculateWeekStreak(logs: WorkoutLog[]): number {
  const mainLogs = logs.filter((l) => l.completed && l.type !== "recovery");
  if (mainLogs.length === 0) return 0;

  // Group by week
  const weekCounts: Record<string, number> = {};
  for (const log of mainLogs) {
    const week = getWeekKey(log.date);
    weekCounts[week] = (weekCounts[week] || 0) + 1;
  }

  // Get sorted weeks descending
  const weeks = Object.keys(weekCounts).sort().reverse();
  if (weeks.length === 0) return 0;

  // Current week might not have 3 yet — check if it's the active week
  const currentWeek = getWeekKey(new Date().toISOString());
  let streak = 0;

  // Start from current week or most recent completed week
  let checkIdx = 0;
  if (weeks[0] === currentWeek) {
    // Current week in progress — count it if already has 3+, otherwise skip it and start from last week
    if (weekCounts[currentWeek] >= 3) {
      streak = 1;
      checkIdx = 1;
    } else {
      // Current week doesn't count yet, start checking from previous week
      checkIdx = 1;
    }
  }

  // Count consecutive past weeks with 3+
  for (let i = checkIdx; i < weeks.length; i++) {
    if (weekCounts[weeks[i]] >= 3) {
      // Check it's actually consecutive (7 days gap from previous)
      if (i > checkIdx) {
        const prevWeek = new Date(weeks[i - 1]);
        const thisWeek = new Date(weeks[i]);
        const gap = Math.round((prevWeek.getTime() - thisWeek.getTime()) / (7 * 86400000));
        if (gap !== 1) break; // gap in weeks
      }
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function useStorage() {
  const [state, setState] = useState<UserState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gym-tracker-state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old logs without type
        if (parsed.workoutLogs) {
          parsed.workoutLogs = parsed.workoutLogs.map((l: WorkoutLog) => ({
            ...l,
            type: l.type || "main",
          }));
        }
        setState(parsed);
      } catch {
        // ignore parse errors
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("gym-tracker-state", JSON.stringify(state));
    }
  }, [state, loaded]);

  const getLevel = useCallback(() => {
    let current = levels[0];
    for (const l of levels) {
      if (state.xp >= l.minXp) current = l;
    }
    const nextLevel = levels.find((l) => l.minXp > state.xp);
    const progress = nextLevel
      ? ((state.xp - current.minXp) / (nextLevel.minXp - current.minXp)) * 100
      : 100;
    return { ...current, progress, nextLevel };
  }, [state.xp]);

  const getExerciseHistory = useCallback(
    (exerciseName: string): ExerciseHistory[] => {
      const history: ExerciseHistory[] = [];
      for (const log of state.workoutLogs) {
        if (!log.completed || log.type === "recovery") continue;
        for (const ex of log.exercises) {
          const name = ex.exerciseName || findExerciseName(ex.exerciseId);
          if (name === exerciseName) {
            history.push({
              date: log.date,
              day: log.day,
              weight: ex.actualWeight,
              sets: ex.sets,
            });
          }
        }
      }
      return history;
    },
    [state.workoutLogs]
  );

  // How many main workouts this week (Mon-Sun)
  const getThisWeekMainCount = useCallback(() => {
    const currentWeek = getWeekKey(new Date().toISOString());
    return state.workoutLogs.filter(
      (l) => l.completed && l.type !== "recovery" && getWeekKey(l.date) === currentWeek
    ).length;
  }, [state.workoutLogs]);

  const completeWorkout = useCallback(
    (log: WorkoutLog) => {
      setState((prev) => {
        const allLogs = [...prev.workoutLogs, log];
        const newStreak = calculateWeekStreak(allLogs);

        const mainLogs = allLogs.filter((l) => l.completed && l.type !== "recovery");
        const completedCount = mainLogs.length;

        let earnedXp: number;
        if (log.type === "recovery") {
          earnedXp = log.totalXp || 10; // recovery XP is pre-set
        } else {
          earnedXp = 25;
          earnedXp += Math.min(newStreak, 10) * 5; // streak bonus capped

          // Check weight progression by exercise NAME
          let newWeightUps = prev.weightUps;
          for (const ex of log.exercises) {
            const name = ex.exerciseName;
            if (!name || !ex.actualWeight) continue;

            const prevEntries: { weight: string }[] = [];
            for (const prevLog of prev.workoutLogs) {
              if (!prevLog.completed || prevLog.type === "recovery") continue;
              for (const prevEx of prevLog.exercises) {
                const prevName = prevEx.exerciseName || findExerciseName(prevEx.exerciseId);
                if (prevName === name) {
                  prevEntries.push({ weight: prevEx.actualWeight });
                }
              }
            }

            if (prevEntries.length > 0) {
              const lastWeight = prevEntries[prevEntries.length - 1].weight;
              if (lastWeight && ex.actualWeight > lastWeight) {
                newWeightUps++;
                earnedXp += 10;
              }
            }
          }

          // Check achievements (only for main workouts)
          const newUnlocked = [...prev.unlockedAchievements];
          for (const ach of achievements) {
            if (!newUnlocked.includes(ach.id) && ach.condition(completedCount, newStreak, newWeightUps)) {
              newUnlocked.push(ach.id);
              earnedXp += ach.xp;
            }
          }

          const nextDay = (log.day % 12) + 1;

          return {
            ...prev,
            currentDay: nextDay,
            xp: prev.xp + earnedXp,
            streak: newStreak,
            lastWorkoutDate: new Date().toISOString().split("T")[0],
            workoutLogs: [...prev.workoutLogs, { ...log, totalXp: earnedXp }],
            unlockedAchievements: newUnlocked,
            weightUps: newWeightUps,
          };
        }

        // Recovery workout — simpler path
        return {
          ...prev,
          xp: prev.xp + earnedXp,
          streak: newStreak,
          lastWorkoutDate: new Date().toISOString().split("T")[0],
          workoutLogs: [...prev.workoutLogs, { ...log, totalXp: earnedXp }],
        };
      });
    },
    []
  );

  const resetProgress = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  return { state, loaded, getLevel, getExerciseHistory, getThisWeekMainCount, completeWorkout, resetProgress };
}

function findExerciseName(exerciseId: string): string {
  for (const day of workoutDays) {
    for (const ex of day.exercises) {
      if (ex.id === exerciseId) return ex.name;
    }
  }
  return "";
}
