"use client";

import { useState } from "react";
import { useStorage } from "../hooks/useStorage";
import { recoveryWorkouts, categoryLabels, categoryColors } from "../data/recovery";
import Link from "next/link";

export default function RecoveryPage() {
  const { state, loaded, completeWorkout } = useStorage();
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);
  const [checkedExercises, setCheckedExercises] = useState<Set<string>>(new Set());
  const [showComplete, setShowComplete] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const todayRecoveries = state.workoutLogs.filter(
    (l) =>
      l.type === "recovery" &&
      l.completed &&
      new Date(l.date).toISOString().split("T")[0] === new Date().toISOString().split("T")[0]
  );

  const toggleExercise = (id: string) => {
    setCheckedExercises((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleComplete = (workoutId: string) => {
    const rw = recoveryWorkouts.find((w) => w.id === workoutId);
    if (!rw) return;

    completeWorkout({
      day: 0,
      date: new Date().toISOString(),
      exercises: [],
      completed: true,
      totalXp: rw.xp,
      type: "recovery",
      recoveryId: workoutId,
    });

    setEarnedXp(rw.xp);
    setShowComplete(true);
    setActiveWorkout(null);
    setCheckedExercises(new Set());
  };

  if (showComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] animate-slide-up">
        <div className="text-5xl mb-4">🧘</div>
        <h1 className="text-2xl font-bold mb-2">Восстановление пройдено!</h1>
        <div className="bg-card rounded-2xl p-6 text-center mb-6">
          <p className="text-xp text-3xl font-bold">+{earnedXp} XP</p>
          <p className="text-muted text-sm mt-1">Бонус за восстановление</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="bg-card hover:bg-card-hover px-6 py-3 rounded-xl font-medium transition-colors"
          >
            На главную
          </Link>
          <button
            onClick={() => setShowComplete(false)}
            className="bg-primary text-white hover:bg-primary/80 px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Ещё тренировка
          </button>
        </div>
      </div>
    );
  }

  if (activeWorkout) {
    const rw = recoveryWorkouts.find((w) => w.id === activeWorkout)!;
    const allChecked = rw.exercises.every((e) => checkedExercises.has(e.id));

    return (
      <div className="animate-slide-up">
        <button
          onClick={() => { setActiveWorkout(null); setCheckedExercises(new Set()); }}
          className="text-muted text-sm flex items-center gap-1 mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </button>

        <h1 className="text-2xl font-bold mb-1">{rw.name}</h1>
        <p className="text-muted text-sm mb-1">{rw.description}</p>
        <p className="text-muted text-xs mb-6">{rw.duration} · +{rw.xp} XP</p>

        <div className="space-y-3 mb-6">
          {rw.exercises.map((ex) => {
            const checked = checkedExercises.has(ex.id);
            return (
              <button
                key={ex.id}
                onClick={() => toggleExercise(ex.id)}
                className={`w-full rounded-xl p-4 text-left transition-all ${
                  checked ? "bg-success/10 border border-success/30" : "bg-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      checked ? "bg-success text-white" : "border-2 border-muted"
                    }`}
                  >
                    {checked && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium text-sm ${checked ? "text-success" : ""}`}>{ex.name}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${categoryColors[ex.category]}`}>
                        {categoryLabels[ex.category]}
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">{ex.duration}</p>
                    <p className="text-xs text-muted">{ex.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handleComplete(activeWorkout)}
          disabled={checkedExercises.size === 0}
          className={`w-full font-bold py-4 rounded-2xl text-lg transition-all ${
            checkedExercises.size > 0
              ? "bg-success hover:bg-success/80 text-white"
              : "bg-card text-muted cursor-not-allowed"
          }`}
        >
          {allChecked
            ? "Завершить! 🧘"
            : checkedExercises.size > 0
            ? `Завершить (${checkedExercises.size}/${rw.exercises.length})`
            : "Отметь хотя бы одно упражнение"}
        </button>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <Link href="/" className="text-muted text-sm flex items-center gap-1 mb-4">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Назад
      </Link>

      <h1 className="text-2xl font-bold mb-1">Восстановление</h1>
      <p className="text-muted text-sm mb-6">
        Лёгкие упражнения для дней между основными тренировками
      </p>

      {todayRecoveries.length > 0 && (
        <div className="bg-success/10 border border-success/20 rounded-xl p-3 mb-4">
          <p className="text-success text-sm font-medium">
            Сегодня уже выполнено: {todayRecoveries.length} восстановительных
          </p>
        </div>
      )}

      <div className="space-y-3">
        {recoveryWorkouts.map((rw) => (
          <button
            key={rw.id}
            onClick={() => setActiveWorkout(rw.id)}
            className="w-full bg-card rounded-xl p-4 text-left hover:bg-card-hover transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">{rw.name}</p>
                <p className="text-muted text-sm mt-0.5">{rw.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-muted">{rw.duration}</span>
                  <span className="text-xs font-medium text-xp">+{rw.xp} XP</span>
                  <span className="text-xs text-muted">{rw.exercises.length} упр.</span>
                </div>
              </div>
              <svg className="w-5 h-5 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 bg-card rounded-xl p-4">
        <p className="text-sm font-medium mb-1">Когда делать?</p>
        <p className="text-xs text-muted">
          В дни между основными тренировками. Помогает восстановлению мышц,
          улучшает подвижность и даёт небольшой бонус XP. Пропуск восстановительных
          не влияет на серию и прогресс.
        </p>
      </div>
    </div>
  );
}
