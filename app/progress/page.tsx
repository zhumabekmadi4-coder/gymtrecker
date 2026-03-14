"use client";

import { useStorage } from "../hooks/useStorage";
import { workoutDays } from "../data/workouts";
import XpBar from "../components/XpBar";

export default function ProgressPage() {
  const { state, loaded, getLevel } = useStorage();

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const level = getLevel();
  const completedLogs = state.workoutLogs.filter((w) => w.completed);

  // Build weight progression data per exercise (by name, not ID)
  const exerciseProgress: Record<string, { name: string; weights: { date: string; weight: string }[] }> = {};
  for (const log of completedLogs) {
    for (const ex of log.exercises) {
      const name = ex.exerciseName || workoutDays.flatMap((d) => d.exercises).find((e) => e.id === ex.exerciseId)?.name;
      if (!name || !ex.actualWeight) continue;
      if (!exerciseProgress[name]) {
        exerciseProgress[name] = { name, weights: [] };
      }
      exerciseProgress[name].weights.push({
        date: new Date(log.date).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }),
        weight: ex.actualWeight,
      });
    }
  }

  // Calendar heatmap - last 30 days
  const today = new Date();
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    const dateStr = d.toISOString().split("T")[0];
    const hasWorkout = completedLogs.some(
      (w) => new Date(w.date).toISOString().split("T")[0] === dateStr
    );
    return { date: d, dateStr, hasWorkout, dayOfWeek: d.getDay() };
  });

  // XP history
  const xpHistory = completedLogs.map((log, i) => ({
    workout: i + 1,
    xp: log.totalXp,
    totalXp: completedLogs.slice(0, i + 1).reduce((s, l) => s + l.totalXp, 0),
  }));

  return (
    <div className="animate-slide-up">
      <h1 className="text-2xl font-bold mb-6">Прогресс</h1>

      <XpBar
        level={level.level}
        title={level.title}
        xp={state.xp}
        progress={level.progress}
        nextLevel={level.nextLevel}
      />

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-card rounded-xl p-4">
          <p className="text-3xl font-bold text-primary-light">{completedLogs.length}</p>
          <p className="text-muted text-sm">Тренировок всего</p>
        </div>
        <div className="bg-card rounded-xl p-4">
          <p className="text-3xl font-bold text-warning">{state.streak}</p>
          <p className="text-muted text-sm">Текущая серия</p>
        </div>
        <div className="bg-card rounded-xl p-4">
          <p className="text-3xl font-bold text-success">{state.weightUps}</p>
          <p className="text-muted text-sm">Увеличений веса</p>
        </div>
        <div className="bg-card rounded-xl p-4">
          <p className="text-3xl font-bold text-xp">{state.xp}</p>
          <p className="text-muted text-sm">Всего XP</p>
        </div>
      </div>

      {/* Activity heatmap */}
      <div className="bg-card rounded-xl p-4 mb-6">
        <h2 className="font-bold mb-3">Активность (30 дней)</h2>
        <div className="grid grid-cols-10 gap-1.5">
          {last30.map((day) => (
            <div
              key={day.dateStr}
              className={`aspect-square rounded-md transition-colors ${
                day.hasWorkout ? "bg-success" : "bg-background"
              }`}
              title={`${day.date.toLocaleDateString("ru-RU")}${day.hasWorkout ? " - тренировка" : ""}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-end gap-2 mt-2">
          <div className="w-3 h-3 rounded bg-background" />
          <span className="text-xs text-muted">Нет</span>
          <div className="w-3 h-3 rounded bg-success" />
          <span className="text-xs text-muted">Тренировка</span>
        </div>
      </div>

      {/* XP chart */}
      {xpHistory.length > 0 && (
        <div className="bg-card rounded-xl p-4 mb-6">
          <h2 className="font-bold mb-3">Рост XP</h2>
          <div className="h-32 flex items-end gap-1">
            {xpHistory.map((item, i) => {
              const maxXp = Math.max(...xpHistory.map((h) => h.totalXp));
              const height = maxXp > 0 ? (item.totalXp / maxXp) * 100 : 0;
              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-t-sm min-w-[4px] transition-all"
                  style={{ height: `${Math.max(height, 4)}%` }}
                  title={`Тренировка ${item.workout}: +${item.xp} XP (всего: ${item.totalXp})`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>Тренировка 1</span>
            <span>Тренировка {xpHistory.length}</span>
          </div>
        </div>
      )}

      {/* Weight progression */}
      {Object.keys(exerciseProgress).length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold mb-3">Прогрессия весов</h2>
          <div className="space-y-3">
            {Object.values(exerciseProgress)
              .filter((ep) => ep.weights.length > 1)
              .slice(0, 10)
              .map((ep) => (
                <div key={ep.name} className="bg-card rounded-xl p-4">
                  <p className="font-medium text-sm mb-2">{ep.name}</p>
                  <div className="flex items-center gap-2 overflow-x-auto">
                    {ep.weights.map((w, i) => (
                      <div key={i} className="shrink-0 text-center">
                        <p className={`text-sm font-bold ${
                          i > 0 && w.weight > ep.weights[i - 1].weight
                            ? "text-success"
                            : ""
                        }`}>
                          {w.weight}
                        </p>
                        <p className="text-xs text-muted">{w.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Workout history */}
      {completedLogs.length > 0 && (
        <div>
          <h2 className="font-bold mb-3">История тренировок</h2>
          <div className="space-y-2">
            {[...completedLogs].reverse().slice(0, 20).map((log, i) => (
              <div key={i} className="bg-card rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">День {log.day}</p>
                  <p className="text-xs text-muted">
                    {new Date(log.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span className="text-xp font-bold text-sm">+{log.totalXp} XP</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {completedLogs.length === 0 && (
        <div className="bg-card rounded-xl p-8 text-center">
          <p className="text-4xl mb-3">💪</p>
          <p className="text-muted">Заверши первую тренировку, чтобы увидеть прогресс</p>
        </div>
      )}
    </div>
  );
}
