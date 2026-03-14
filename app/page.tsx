"use client";

import { useStorage } from "./hooks/useStorage";
import { workoutDays } from "./data/workouts";
import XpBar from "./components/XpBar";
import Link from "next/link";

export default function Home() {
  const { state, loaded, getLevel } = useStorage();

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const level = getLevel();
  const completedCount = state.workoutLogs.filter((w) => w.completed).length;
  const currentCycle = Math.floor(completedCount / 12) + 1;
  const currentDayInCycle = ((state.currentDay - 1) % 12) + 1;

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">GymTracker</h1>
          <p className="text-muted text-sm">Цикл {currentCycle} / День {currentDayInCycle}</p>
        </div>
        <div className="flex items-center gap-2">
          {state.streak > 0 && (
            <div className="bg-card px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="text-lg">🔥</span>
              <span className="font-bold text-sm">{state.streak}</span>
            </div>
          )}
        </div>
      </div>

      <XpBar
        level={level.level}
        title={level.title}
        xp={state.xp}
        progress={level.progress}
        nextLevel={level.nextLevel}
      />

      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Следующая тренировка</h2>
        <Link
          href={`/workout/${currentDayInCycle}`}
          className="block bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-5 animate-pulse-glow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-light font-bold text-lg">День {currentDayInCycle}</p>
              <p className="text-muted text-sm mt-1">
                {workoutDays[currentDayInCycle - 1].exercises.length} упражнений
              </p>
            </div>
            <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {Array.from(new Set(
              workoutDays[currentDayInCycle - 1].exercises.map((e) => {
                const n = e.name.toLowerCase();
                if (n.includes("присед") || n.includes("ног") || n.includes("выпад") || n.includes("нос")) return "Ноги";
                if (n.includes("жим") && !n.includes("стоя") && !n.includes("подбородк")) return "Грудь";
                if (n.includes("тяг") || n.includes("подтяг")) return "Спина";
                if (n.includes("бицепс") || n.includes("пшнб") || n.includes("сгиб")) return "Бицепс";
                if (n.includes("разгиб") || n.includes("отжим")) return "Трицепс";
                if (n.includes("мах") || n.includes("шраг") || n.includes("подбородк")) return "Плечи";
                if (n.includes("пресс") || n.includes("скруч")) return "Пресс";
                if (n.includes("гипер")) return "Поясница";
                if (n.includes("развод") || n.includes("блин")) return "Грудь";
                return "Другое";
              })
            )).map((group) => (
              <span key={group} className="px-2.5 py-1 bg-primary/20 text-primary-light text-xs rounded-full font-medium">
                {group}
              </span>
            ))}
          </div>
        </Link>
      </div>

      <h2 className="text-lg font-bold mb-3">Все тренировки</h2>
      <div className="grid grid-cols-3 gap-3">
        {workoutDays.map((day) => {
          const completions = state.workoutLogs.filter(
            (w) => w.day === day.day && w.completed
          ).length;
          const isCurrent = day.day === currentDayInCycle;
          return (
            <Link
              key={day.day}
              href={`/workout/${day.day}`}
              className={`bg-card rounded-xl p-3 text-center transition-all ${
                isCurrent ? "ring-2 ring-primary" : "hover:bg-card-hover"
              }`}
            >
              <p className={`font-bold text-lg ${isCurrent ? "text-primary-light" : ""}`}>
                {day.day}
              </p>
              <p className="text-muted text-xs">{day.exercises.length} упр.</p>
              {completions > 0 && (
                <div className="mt-1 flex items-center justify-center gap-1">
                  <span className="text-success text-xs">✓ ×{completions}</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="bg-card rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-primary-light">{completedCount}</p>
          <p className="text-muted text-xs">Тренировок</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-warning">{state.streak}</p>
          <p className="text-muted text-xs">Серия</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-success">{state.unlockedAchievements.length}</p>
          <p className="text-muted text-xs">Награды</p>
        </div>
      </div>
    </div>
  );
}
