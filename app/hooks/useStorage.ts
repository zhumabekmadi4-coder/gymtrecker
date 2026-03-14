"use client";

import { useState, useEffect, useCallback } from "react";
import { achievements, levels } from "../data/workouts";

export interface SetLog {
  reps: number;
  weight: string;
  done: boolean;
}

export interface ExerciseLog {
  exerciseId: string;
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

const DEFAULT_STATE: UserState = {
  currentDay: 1,
  xp: 0,
  streak: 0,
  lastWorkoutDate: null,
  workoutLogs: [],
  unlockedAchievements: [],
  weightUps: 0,
};

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

  const completeWorkout = useCallback(
    (log: WorkoutLog) => {
      setState((prev) => {
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const newStreak =
          prev.lastWorkoutDate === yesterday || prev.lastWorkoutDate === today
            ? prev.streak + 1
            : 1;

        const completedCount = prev.workoutLogs.filter((w) => w.completed).length + 1;
        let earnedXp = 50; // base XP per workout
        earnedXp += newStreak * 10; // streak bonus

        // Check weight progression
        let newWeightUps = prev.weightUps;
        for (const ex of log.exercises) {
          const prevLogs = prev.workoutLogs
            .flatMap((w) => w.exercises)
            .filter((e) => e.exerciseId === ex.exerciseId);
          if (prevLogs.length > 0) {
            const lastWeight = prevLogs[prevLogs.length - 1].actualWeight;
            if (ex.actualWeight && lastWeight && ex.actualWeight > lastWeight) {
              newWeightUps++;
              earnedXp += 20;
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

        const nextDay = ((log.day) % 12) + 1;

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

  return { state, loaded, getLevel, completeWorkout, resetProgress };
}
