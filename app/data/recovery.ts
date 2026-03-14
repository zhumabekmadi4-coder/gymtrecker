export interface RecoveryExercise {
  id: string;
  name: string;
  duration: string;
  description: string;
  category: "cardio" | "stretch" | "mobility" | "core";
}

export interface RecoveryWorkout {
  id: string;
  name: string;
  description: string;
  duration: string;
  xp: number;
  exercises: RecoveryExercise[];
}

export const recoveryWorkouts: RecoveryWorkout[] = [
  {
    id: "light_cardio",
    name: "Лёгкое кардио",
    description: "Низкоинтенсивное кардио для восстановления",
    duration: "20-30 мин",
    xp: 10,
    exercises: [
      { id: "rc1", name: "Ходьба на дорожке", duration: "10 мин", description: "Быстрый темп, наклон 3-5%", category: "cardio" },
      { id: "rc2", name: "Велотренажёр", duration: "10 мин", description: "Лёгкое сопротивление, 60-70 RPM", category: "cardio" },
      { id: "rc3", name: "Эллиптический тренажёр", duration: "10 мин", description: "Низкий темп, без нагрузки на суставы", category: "cardio" },
    ],
  },
  {
    id: "full_stretch",
    name: "Растяжка всего тела",
    description: "Статическая растяжка для восстановления мышц",
    duration: "15-20 мин",
    xp: 10,
    exercises: [
      { id: "rs1", name: "Наклон к ногам стоя", duration: "30 сек × 2", description: "Задняя поверхность бедра", category: "stretch" },
      { id: "rs2", name: "Выпад с растяжкой", duration: "30 сек × 2 на ногу", description: "Сгибатели бедра", category: "stretch" },
      { id: "rs3", name: "Растяжка грудных у стены", duration: "30 сек × 2", description: "Грудные мышцы и передние дельты", category: "stretch" },
      { id: "rs4", name: "Растяжка широчайших", duration: "30 сек × 2", description: "Вис на перекладине или растяжка у стойки", category: "stretch" },
      { id: "rs5", name: "Растяжка трицепса", duration: "30 сек × 2", description: "Рука за голову, другой давишь на локоть", category: "stretch" },
      { id: "rs6", name: "Кошка-корова", duration: "10 повторений", description: "Мобильность позвоночника", category: "mobility" },
      { id: "rs7", name: "Скорпион лёжа", duration: "30 сек × 2", description: "Ротация позвоночника", category: "stretch" },
    ],
  },
  {
    id: "mobility_flow",
    name: "Мобильность и суставы",
    description: "Разработка суставов и улучшение подвижности",
    duration: "15 мин",
    xp: 10,
    exercises: [
      { id: "rm1", name: "Круговые вращения плечами", duration: "20 × каждое направление", description: "Разогрев плечевых суставов", category: "mobility" },
      { id: "rm2", name: "Вращение бёдрами", duration: "10 × каждая нога", description: "Тазобедренный сустав", category: "mobility" },
      { id: "rm3", name: "Глубокий присед с задержкой", duration: "5 × 10 сек", description: "Мобильность голеностопа и бёдер", category: "mobility" },
      { id: "rm4", name: "Повороты корпуса с палкой", duration: "20 повторений", description: "Ротация грудного отдела", category: "mobility" },
      { id: "rm5", name: "Пропуск через палку", duration: "10 повторений", description: "Мобильность плечевого сустава", category: "mobility" },
    ],
  },
  {
    id: "core_light",
    name: "Лёгкий кор",
    description: "Укрепление кора без нагрузки на основные группы",
    duration: "10-15 мин",
    xp: 10,
    exercises: [
      { id: "rk1", name: "Планка", duration: "3 × 30-60 сек", description: "Статическое удержание", category: "core" },
      { id: "rk2", name: "Боковая планка", duration: "3 × 20-30 сек × сторона", description: "Косые мышцы", category: "core" },
      { id: "rk3", name: "Bird-dog", duration: "3 × 10 на сторону", description: "Стабилизация поясницы", category: "core" },
      { id: "rk4", name: "Dead bug", duration: "3 × 10 на сторону", description: "Глубокие мышцы живота", category: "core" },
      { id: "rk5", name: "Ягодичный мостик", duration: "3 × 15", description: "Активация ягодичных", category: "core" },
    ],
  },
  {
    id: "walk_outdoor",
    name: "Прогулка на свежем воздухе",
    description: "Активное восстановление и кардио",
    duration: "30-45 мин",
    xp: 8,
    exercises: [
      { id: "rw1", name: "Быстрая ходьба", duration: "30-45 мин", description: "Темп 6-7 км/ч, ровный ритм", category: "cardio" },
    ],
  },
];

export const categoryLabels: Record<string, string> = {
  cardio: "Кардио",
  stretch: "Растяжка",
  mobility: "Мобильность",
  core: "Кор",
};

export const categoryColors: Record<string, string> = {
  cardio: "text-danger bg-danger/10",
  stretch: "text-success bg-success/10",
  mobility: "text-warning bg-warning/10",
  core: "text-primary bg-primary/10",
};
