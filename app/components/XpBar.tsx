"use client";

interface XpBarProps {
  level: number;
  title: string;
  xp: number;
  progress: number;
  nextLevel: { minXp: number; title: string } | undefined;
}

export default function XpBar({ level, title, xp, progress, nextLevel }: XpBarProps) {
  return (
    <div className="bg-card rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-xl font-bold">
            {level}
          </div>
          <div>
            <p className="font-bold text-lg">{title}</p>
            <p className="text-muted text-sm">{xp} XP</p>
          </div>
        </div>
        {nextLevel && (
          <p className="text-xs text-muted">
            До «{nextLevel.title}»: {nextLevel.minXp - xp} XP
          </p>
        )}
      </div>
      <div className="w-full h-3 bg-background rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-700"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
