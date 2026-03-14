"use client";

import { useStorage } from "../hooks/useStorage";
import { achievements } from "../data/workouts";
import XpBar from "../components/XpBar";

export default function AchievementsPage() {
  const { state, loaded, getLevel, resetProgress } = useStorage();

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const level = getLevel();
  const completedCount = state.workoutLogs.filter((w) => w.completed).length;

  return (
    <div className="animate-slide-up">
      <h1 className="text-2xl font-bold mb-6">Награды</h1>

      <XpBar
        level={level.level}
        title={level.title}
        xp={state.xp}
        progress={level.progress}
        nextLevel={level.nextLevel}
      />

      {/* Achievement summary */}
      <div className="bg-card rounded-xl p-4 mb-6 text-center">
        <p className="text-4xl font-bold text-primary-light">
          {state.unlockedAchievements.length}/{achievements.length}
        </p>
        <p className="text-muted text-sm mt-1">Достижений получено</p>
      </div>

      {/* Achievement grid */}
      <div className="space-y-3 mb-8">
        {achievements.map((ach) => {
          const unlocked = state.unlockedAchievements.includes(ach.id);
          let progressPercent = 0;
          const targetMap: Record<string, [number, "completed" | "streak" | "weight"]> = {
            first_workout: [1, "completed"], half_program: [6, "completed"],
            full_program: [12, "completed"], two_cycles: [24, "completed"],
            three_cycles: [36, "completed"], five_cycles: [60, "completed"],
            streak_3: [3, "streak"], streak_9: [9, "streak"], streak_24: [24, "streak"],
            weight_up_5: [5, "weight"], weight_up_20: [20, "weight"], weight_up_50: [50, "weight"],
          };
          const tm = targetMap[ach.id];
          if (tm) {
            const val = tm[1] === "completed" ? completedCount : tm[1] === "streak" ? state.streak : state.weightUps;
            progressPercent = Math.min((val / tm[0]) * 100, 100);
          }

          return (
            <div
              key={ach.id}
              className={`rounded-xl p-4 transition-all ${
                unlocked
                  ? "bg-gradient-to-r from-primary/20 to-success/10 border border-primary/30"
                  : "bg-card opacity-70"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                    unlocked ? "bg-primary/30" : "bg-background grayscale"
                  }`}
                >
                  {ach.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`font-bold ${unlocked ? "text-primary-light" : ""}`}>
                      {ach.name}
                    </p>
                    <span className={`text-sm font-bold ${unlocked ? "text-xp" : "text-muted"}`}>
                      +{ach.xp} XP
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-0.5">{ach.description}</p>
                  {!unlocked && (
                    <div className="mt-2">
                      <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-muted rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {unlocked && (
                    <p className="text-xs text-success mt-1 font-medium">Получено!</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset */}
      <div className="border-t border-border pt-6 mt-6">
        <button
          onClick={() => {
            if (window.confirm("Точно сбросить весь прогресс? Это действие нельзя отменить.")) {
              resetProgress();
            }
          }}
          className="w-full bg-danger/10 text-danger py-3 rounded-xl text-sm font-medium hover:bg-danger/20 transition-colors"
        >
          Сбросить прогресс
        </button>
      </div>
    </div>
  );
}
