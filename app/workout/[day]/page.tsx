"use client";

import { useState, use } from "react";
import { useStorage, ExerciseLog } from "../../hooks/useStorage";
import { workoutDays } from "../../data/workouts";
import Link from "next/link";

interface ExerciseState {
  exerciseId: string;
  exerciseName: string;
  sets: { done: boolean; reps: string; weight: string }[];
  actualWeight: string;
}

export default function WorkoutPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = use(params);
  const dayNum = parseInt(day);
  const workout = workoutDays.find((w) => w.day === dayNum);
  const { state, loaded, completeWorkout, getExerciseHistory } = useStorage();
  const [exerciseStates, setExerciseStates] = useState<ExerciseState[]>([]);
  const [started, setStarted] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerInterval, setTimerIntervalState] = useState<ReturnType<typeof setInterval> | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  if (!loaded || !workout) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const startWorkout = () => {
    const initial = workout.exercises.map((ex) => {
      const setsMatch = ex.sets.match(/(\d+)[×x*]/);
      const numSets = setsMatch ? parseInt(setsMatch[1]) : 3;

      // Pre-fill weight from last time this exercise was done
      const history = getExerciseHistory(ex.name);
      const lastWeight = history.length > 0 ? history[history.length - 1].weight : ex.weight;

      return {
        exerciseId: ex.id,
        exerciseName: ex.name,
        sets: Array.from({ length: numSets }, () => ({ done: false, reps: "", weight: "" })),
        actualWeight: lastWeight || ex.weight,
      };
    });
    setExerciseStates(initial);
    setStarted(true);
    setExpandedExercise(workout.exercises[0].id);
  };

  const toggleSet = (exIdx: number, setIdx: number) => {
    setExerciseStates((prev) => {
      const next = [...prev];
      const ex = { ...next[exIdx] };
      const sets = [...ex.sets];
      sets[setIdx] = { ...sets[setIdx], done: !sets[setIdx].done };
      ex.sets = sets;
      next[exIdx] = ex;
      return next;
    });
  };

  const updateWeight = (exIdx: number, weight: string) => {
    setExerciseStates((prev) => {
      const next = [...prev];
      next[exIdx] = { ...next[exIdx], actualWeight: weight };
      return next;
    });
  };

  const startRestTimer = (seconds: number) => {
    if (timerInterval) clearInterval(timerInterval);
    setTimer(seconds);
    setTimerActive(true);
    const iv = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(iv);
          setTimerActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    setTimerIntervalState(iv);
  };

  const totalSets = exerciseStates.reduce((sum, ex) => sum + ex.sets.length, 0);
  const doneSets = exerciseStates.reduce(
    (sum, ex) => sum + ex.sets.filter((s) => s.done).length,
    0
  );
  const progress = totalSets > 0 ? (doneSets / totalSets) * 100 : 0;

  const handleComplete = () => {
    const logs: ExerciseLog[] = exerciseStates.map((ex) => ({
      exerciseId: ex.exerciseId,
      exerciseName: ex.exerciseName,
      sets: ex.sets.map((s) => ({
        reps: parseInt(s.reps) || 0,
        weight: s.weight,
        done: s.done,
      })),
      actualWeight: ex.actualWeight,
    }));

    const log = {
      day: dayNum,
      date: new Date().toISOString(),
      exercises: logs,
      completed: true,
      totalXp: 0,
    };

    completeWorkout(log);
    setEarnedXp(25 + Math.min(state.streak + 1, 10) * 5);
    setShowComplete(true);
  };

  if (showComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] animate-slide-up">
        <div className="text-6xl mb-4 animate-confetti">🎉</div>
        <h1 className="text-3xl font-bold mb-2">Отличная работа!</h1>
        <p className="text-muted mb-2">День {dayNum} завершён</p>
        <div className="bg-card rounded-2xl p-6 text-center mb-6">
          <p className="text-xp text-4xl font-bold">+{earnedXp} XP</p>
          <p className="text-muted text-sm mt-1">Заработано за тренировку</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="bg-card hover:bg-card-hover px-6 py-3 rounded-xl font-medium transition-colors"
          >
            На главную
          </Link>
          <Link
            href="/achievements"
            className="bg-primary hover:bg-primary/80 px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Награды
          </Link>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="animate-slide-up">
        <Link href="/" className="text-muted text-sm flex items-center gap-1 mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </Link>
        <h1 className="text-2xl font-bold mb-1">День {dayNum}</h1>
        <p className="text-muted text-sm mb-6">
          {workout.exercises.length} упражнений
        </p>

        {workout.notes && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-primary-light">{workout.notes}</p>
          </div>
        )}

        <div className="space-y-3 mb-6">
          {workout.exercises.map((ex, i) => {
            const history = getExerciseHistory(ex.name);
            const lastEntry = history.length > 0 ? history[history.length - 1] : null;

            return (
              <div key={ex.id} className="bg-card rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {ex.superset && (
                        <span className="text-xs bg-primary/20 text-primary-light px-2 py-0.5 rounded-full font-medium">
                          {ex.superset}
                        </span>
                      )}
                      <span className="text-muted text-xs">#{i + 1}</span>
                    </div>
                    <p className="font-medium mt-1">{ex.name}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted">
                      <span>{ex.sets}</span>
                      {ex.weight && <span>{ex.weight}</span>}
                      {ex.rest && <span>Отдых: {ex.rest}</span>}
                    </div>
                    {ex.comment && (
                      <p className="text-xs text-warning mt-2">{ex.comment}</p>
                    )}

                    {lastEntry && (
                      <div className="mt-2 bg-primary/5 border border-primary/10 rounded-lg px-3 py-2">
                        <p className="text-xs text-muted mb-1">
                          Прошлый раз (день {lastEntry.day}, {new Date(lastEntry.date).toLocaleDateString("ru-RU")}):
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-primary-light">
                            {lastEntry.weight || "б/в"}
                          </span>
                          <span className="text-xs text-muted">
                            {lastEntry.sets.filter((s) => s.done).length}/{lastEntry.sets.length} подходов
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  {ex.videoUrl && (
                    <a
                      href={ex.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 ml-3 w-10 h-10 bg-danger/20 rounded-lg flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 text-danger" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={startWorkout}
          className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-4 rounded-2xl text-lg transition-colors"
        >
          Начать тренировку
        </button>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm pb-3 pt-1 z-10">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold">День {dayNum}</h1>
          <div className="flex items-center gap-3">
            {timerActive && (
              <div className="bg-warning/20 text-warning px-3 py-1 rounded-full text-sm font-bold">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
              </div>
            )}
            <span className="text-sm text-muted">{doneSets}/{totalSets}</span>
          </div>
        </div>
        <div className="w-full h-2 bg-card rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {[30, 45, 60, 90].map((sec) => (
          <button
            key={sec}
            onClick={() => startRestTimer(sec)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              timerActive && timer > 0 ? "bg-card text-muted" : "bg-card hover:bg-card-hover"
            }`}
          >
            {sec}с
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        {workout.exercises.map((ex, exIdx) => {
          const exState = exerciseStates[exIdx];
          const allDone = exState?.sets.every((s) => s.done);
          const isExpanded = expandedExercise === ex.id;
          const history = getExerciseHistory(ex.name);
          const lastEntry = history.length > 0 ? history[history.length - 1] : null;

          return (
            <div
              key={ex.id}
              className={`rounded-xl overflow-hidden transition-all ${
                allDone ? "bg-success/10 border border-success/30" : "bg-card"
              }`}
            >
              <button
                onClick={() => setExpandedExercise(isExpanded ? null : ex.id)}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                      allDone ? "bg-success text-white" : "bg-card-hover"
                    }`}
                  >
                    {allDone ? "✓" : exIdx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {ex.superset && (
                        <span className="text-xs bg-primary/20 text-primary-light px-1.5 py-0.5 rounded font-medium">
                          {ex.superset}
                        </span>
                      )}
                    </div>
                    <p className={`font-medium text-sm truncate ${allDone ? "text-success" : ""}`}>
                      {ex.name}
                    </p>
                    <p className="text-xs text-muted">{ex.sets} · {exState?.actualWeight || ex.weight || "б/в"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {ex.videoUrl && (
                    <a
                      href={ex.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 bg-danger/20 rounded-lg flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-danger" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  )}
                  <svg
                    className={`w-5 h-5 text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isExpanded && exState && (
                <div className="px-4 pb-4 space-y-3">
                  {ex.comment && (
                    <p className="text-xs text-warning bg-warning/10 rounded-lg px-3 py-2">
                      {ex.comment}
                    </p>
                  )}

                  {lastEntry && (
                    <div className="bg-primary/5 border border-primary/10 rounded-lg px-3 py-2.5">
                      <p className="text-xs text-muted mb-1.5 font-medium">
                        Прошлый раз (день {lastEntry.day}, {new Date(lastEntry.date).toLocaleDateString("ru-RU")}):
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-primary-light">
                          {lastEntry.weight || "б/в"}
                        </span>
                        <span className="text-xs text-muted">
                          {lastEntry.sets.filter((s) => s.done).length}/{lastEntry.sets.length} подходов
                        </span>
                      </div>
                      {history.length > 1 && (
                        <div className="mt-2 flex items-center gap-2 overflow-x-auto">
                          <span className="text-xs text-muted shrink-0">История:</span>
                          {history.slice(-5).map((h, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-0.5 rounded shrink-0 ${
                                i < history.slice(-5).length - 1 && history.slice(-5)[i + 1]?.weight > h.weight
                                  ? "text-success bg-success/10"
                                  : "text-muted bg-background"
                              }`}
                            >
                              {h.weight || "б/в"}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted shrink-0">Вес сегодня:</label>
                    <input
                      type="text"
                      value={exState.actualWeight}
                      onChange={(e) => updateWeight(exIdx, e.target.value)}
                      className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm w-full"
                      placeholder="Введи вес"
                    />
                  </div>

                  <div className="space-y-2">
                    {exState.sets.map((set, setIdx) => (
                      <button
                        key={setIdx}
                        onClick={() => toggleSet(exIdx, setIdx)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          set.done
                            ? "bg-success/20 border border-success/30"
                            : "bg-background border border-border"
                        }`}
                      >
                        <span className="text-sm font-medium">
                          Подход {setIdx + 1}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                            set.done
                              ? "bg-success text-white"
                              : "border-2 border-muted"
                          }`}
                        >
                          {set.done && (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleComplete}
        disabled={progress < 50}
        className={`w-full font-bold py-4 rounded-2xl text-lg transition-all ${
          progress >= 50
            ? "bg-success hover:bg-success/80 text-white"
            : "bg-card text-muted cursor-not-allowed"
        }`}
      >
        {progress >= 100
          ? "Завершить тренировку! 🎉"
          : progress >= 50
          ? `Завершить (${Math.round(progress)}%)`
          : `Выполни минимум 50% (${Math.round(progress)}%)`}
      </button>
    </div>
  );
}
