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

const MAX_STREAK_GAP_DAYS = 3;

function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA);
  const b = new Date(dateB);
  return Math.floor(Math.abs(b.getTime() - a.getTime()) / 86400000);
}

export function useStorage() {
  const [state, setState] = useState<UserState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gym-tracker-state");
    if (saved) {
      try {
        setState(JSON.parse(saved));
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
        if (!log.completed) continue;
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

  const completeWorkout = useCallback(
    (log: WorkoutLog) => {
      setState((prev) => {
        const today = new Date().toISOString().split("T")[0];

        // Streak: allow up to 3 days gap (3x/week schedule)
        let newStreak: number;
        if (!prev.lastWorkoutDate) {
          newStreak = 1;
        } else {
          const gap = daysBetween(prev.lastWorkoutDate, today);
          if (gap <= MAX_STREAK_GAP_DAYS) {
            newStreak = prev.streak + 1;
          } else {
            newStreak = 1; // streak broken
          }
        }

        const completedCount = prev.workoutLogs.filter((w) => w.completed).length + 1;
        let earnedXp = 25; // base XP per workout (slower progression)
        earnedXp += Math.min(newStreak, 10) * 5; // streak bonus, capped

        // Check weight progression by exercise NAME
        let newWeightUps = prev.weightUps;
        for (const ex of log.exercises) {
          const name = ex.exerciseName;
          if (!name || !ex.actualWeight) continue;

          // Find last time this exercise was done (by name)
          const prevEntries: { weight: string }[] = [];
          for (const prevLog of prev.workoutLogs) {
            if (!prevLog.completed) continue;
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

        // Check achievements
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
          lastWorkoutDate: today,
          workoutLogs: [...prev.workoutLogs, { ...log, totalXp: earnedXp }],
          unlockedAchievements: newUnlocked,
          weightUps: newWeightUps,
        };
      });
    },
    []
  );

  const resetProgress = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  return { state, loaded, getLevel, getExerciseHistory, completeWorkout, resetProgress };
}

function findExerciseName(exerciseId: string): string {
  for (const day of workoutDays) {
    for (const ex of day.exercises) {
      if (ex.id === exerciseId) return ex.name;
    }
  }
  return "";
}
