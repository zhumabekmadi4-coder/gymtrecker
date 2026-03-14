export interface Exercise {
  id: string;
  name: string;
  sets: string;
  rest: string;
  weight: string;
  superset: string;
  comment: string;
  videoUrl: string;
}

export interface WorkoutDay {
  day: number;
  exercises: Exercise[];
  notes: string;
}

export const workoutDays: WorkoutDay[] = [
  {
    day: 1,
    exercises: [
      { id: "d1e1", name: "Приседания со штангой на плечах", sets: "3×10", rest: "40с", weight: "40 кг", superset: "", comment: "Если с техникой беда — можно в Смите", videoUrl: "https://www.youtube.com/watch?v=LCvfPK_Bvyw" },
      { id: "d1e2", name: "Жим гантелей на горизонтальной скамье", sets: "3×8", rest: "", weight: "по 10-12 кг", superset: "A1", comment: "", videoUrl: "https://www.youtube.com/watch?v=mXdyLcQ_VZU" },
      { id: "d1e3", name: "Тяга штанги к животу в наклоне", sets: "3×8", rest: "40с", weight: "40 кг", superset: "A2", comment: "", videoUrl: "https://www.youtube.com/watch?v=ajiggjOjQG8" },
      { id: "d1e4", name: "Жим ногами", sets: "3×12", rest: "", weight: "50-60 кг", superset: "B1", comment: "Поясницу плотно прижать, не отрывать", videoUrl: "https://www.youtube.com/watch?v=jyphzYKrptw" },
      { id: "d1e5", name: "Подъем на носки", sets: "3×30", rest: "", weight: "СПВ", superset: "B2", comment: "СПВ – самому подобрать вес. В руки блинчик взять", videoUrl: "https://www.youtube.com/watch?v=LUVK1Faa0qY" },
      { id: "d1e6", name: "Подъем блина перед собой", sets: "3×10", rest: "", weight: "10 кг", superset: "B3", comment: "", videoUrl: "https://www.youtube.com/watch?v=RzrMA2Gqgsc" },
      { id: "d1e7", name: "ПШНБ стоя", sets: "3×10", rest: "", weight: "20-25 кг", superset: "C1", comment: "", videoUrl: "https://www.youtube.com/watch?v=FqF11YdwxrQ" },
      { id: "d1e8", name: "Разгибание рук на верхнем блоке стоя", sets: "3×10", rest: "", weight: "20-25 кг", superset: "C2", comment: "Медленно", videoUrl: "https://www.youtube.com/watch?v=nHq_8skH6BM" },
      { id: "d1e9", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
    ],
    notes: "Перед каждой тренировкой делай разминку всех суставов + 3 подхода гиперэкстензии 12-15 раз.",
  },
  {
    day: 2,
    exercises: [
      { id: "d2e1", name: "Жим штанги лежа на горизонтальной скамье", sets: "4×10", rest: "40с", weight: "40 кг", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=KIVM12jIn1Q" },
      { id: "d2e2", name: "Сгибание ног на тренажере лежа", sets: "3×12", rest: "", weight: "25-30 кг", superset: "A1", comment: "Медленно. Можешь сразу вес больше взять", videoUrl: "https://www.youtube.com/watch?v=kHA7OtTBjAA" },
      { id: "d2e3", name: "Жим гантелей сидя", sets: "3×10", rest: "", weight: "по 6-8 кг", superset: "A2", comment: "", videoUrl: "https://www.youtube.com/watch?v=MT0Z1J6TPKE" },
      { id: "d2e4", name: "Тяга верхнего блока широким хватом", sets: "3×8", rest: "", weight: "30-35 кг", superset: "B1", comment: "", videoUrl: "https://www.youtube.com/watch?v=3Q2midW9yYw" },
      { id: "d2e5", name: "Жим гантелей на наклонной скамье", sets: "3×8", rest: "", weight: "по 10-12 кг", superset: "B2", comment: "Медленно опускать, быстро поднимать", videoUrl: "https://www.youtube.com/watch?v=xwtaHancCQc" },
      { id: "d2e6", name: "Отжимания от лавки сзади", sets: "3×макс", rest: "", weight: "", superset: "C1", comment: "", videoUrl: "https://www.youtube.com/watch?v=-wIgC3QHDTw" },
      { id: "d2e7", name: "Подъем гантелей на бицепс стоя", sets: "3×10", rest: "", weight: "по 8-10 кг", superset: "C2", comment: "Одновременный", videoUrl: "https://www.youtube.com/watch?v=ki-WpA8hKOY" },
      { id: "d2e8", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
    ],
    notes: "Упражнения 4 и 5 — если есть силы, можно сделать 4 подхода.",
  },
  {
    day: 3,
    exercises: [
      { id: "d3e1", name: "Тяга штанги к животу в наклоне", sets: "3×8", rest: "40с", weight: "40 кг", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=ajiggjOjQG8" },
      { id: "d3e2", name: "Разводка с гантелями", sets: "3×10", rest: "", weight: "8-10 кг", superset: "A1", comment: "", videoUrl: "https://www.youtube.com/watch?v=QaJcczm4uZU" },
      { id: "d3e3", name: "Тяга нижнего блока узким хватом", sets: "3×8", rest: "", weight: "30-35 кг", superset: "A2", comment: "", videoUrl: "https://www.youtube.com/watch?v=ak1RSX5XawQ" },
      { id: "d3e4", name: "Выпады с гантелями вперед", sets: "3×10", rest: "", weight: "по 8-10 кг", superset: "B1", comment: "", videoUrl: "https://www.youtube.com/watch?v=LrYHio3VMRg" },
      { id: "d3e5", name: "Жим штанги стоя с груди", sets: "3×8", rest: "", weight: "20-25 кг", superset: "B2", comment: "", videoUrl: "https://www.youtube.com/watch?v=e8h_a9IvlXs" },
      { id: "d3e6", name: "Подтягивания на низкой перекладине", sets: "3×10", rest: "", weight: "", superset: "C1", comment: "", videoUrl: "https://www.youtube.com/watch?v=MXBQWYnWgw4" },
      { id: "d3e7", name: "Шраги с гантелями", sets: "3×12", rest: "", weight: "по 15-20 кг", superset: "C2", comment: "Можно больше", videoUrl: "https://www.youtube.com/watch?v=acTBIY73ibM" },
      { id: "d3e8", name: "Жим лежа узким хватом", sets: "3×10", rest: "", weight: "25-30 кг", superset: "D1", comment: "", videoUrl: "https://www.youtube.com/watch?v=x4A0qCPmXUA" },
      { id: "d3e9", name: "ПШНБ на скамье Скотта", sets: "3×10", rest: "", weight: "20 кг", superset: "D2", comment: "Медленно опускаешь", videoUrl: "https://www.youtube.com/watch?v=02WfQAoSVEc" },
      { id: "d3e10", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "E1", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
      { id: "d3e11", name: "Гиперэкстензия с блином", sets: "3×10", rest: "", weight: "10 кг", superset: "E2", comment: "", videoUrl: "https://www.youtube.com/watch?v=1en5keKWZt4" },
    ],
    notes: "",
  },
  {
    day: 4,
    exercises: [
      { id: "d4e1", name: "Приседания со штангой на плечах", sets: "3×12", rest: "40с", weight: "40 кг", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=GotRb2Ob7MA" },
      { id: "d4e2", name: "Жим гантелей на горизонтальной скамье", sets: "3×10", rest: "", weight: "по 10-12 кг", superset: "A1", comment: "", videoUrl: "https://www.youtube.com/watch?v=mXdyLcQ_VZU" },
      { id: "d4e3", name: "Тяга гантели в наклоне с упором", sets: "3×8", rest: "", weight: "15-20 кг", superset: "A2", comment: "", videoUrl: "https://www.youtube.com/watch?v=Ch4UZW_j08Q" },
      { id: "d4e4", name: "Жим ногами", sets: "3×10", rest: "", weight: "60-70 кг", superset: "B1", comment: "Поясницу плотно прижать, не отрывать", videoUrl: "https://www.youtube.com/watch?v=jyphzYKrptw" },
      { id: "d4e5", name: "Подъем на носки", sets: "3×30", rest: "", weight: "СПВ", superset: "B2", comment: "СПВ – самому подобрать вес", videoUrl: "https://www.youtube.com/watch?v=LUVK1Faa0qY" },
      { id: "d4e6", name: "Тяга штанги к подбородку широким хватом", sets: "3×8", rest: "", weight: "20-25 кг", superset: "B3", comment: "Гриф до груди, локоть не выше плеча", videoUrl: "https://www.youtube.com/watch?v=Y9x7blBNwJo" },
      { id: "d4e7", name: "Подъем гантелей на бицепс сидя", sets: "3×10", rest: "", weight: "по 8-10 кг", superset: "C1", comment: "", videoUrl: "https://www.youtube.com/watch?v=P957YHBOs6Q" },
      { id: "d4e8", name: "Разгибание рук с гантелью сидя из-за головы", sets: "3×10", rest: "", weight: "12-15 кг", superset: "C2", comment: "Медленно", videoUrl: "https://www.youtube.com/watch?v=7QVHcc_aP5Y" },
      { id: "d4e9", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
    ],
    notes: "",
  },
  {
    day: 5,
    exercises: [
      { id: "d5e1", name: "Жим штанги лежа на горизонтальной скамье", sets: "4×12", rest: "40с", weight: "40 кг", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=KIVM12jIn1Q" },
      { id: "d5e2", name: "Разгибание ног в тренажере", sets: "3×12", rest: "", weight: "25-30 кг", superset: "A1", comment: "Медленно. Сам подбирай вес", videoUrl: "https://www.youtube.com/watch?v=qz8QvMGHJu0" },
      { id: "d5e3", name: "Махи гантелей в стороны стоя", sets: "3×12", rest: "", weight: "по 5-8 кг", superset: "A2", comment: "3 и 4 упражнение делаешь сразу, без перерыва!", videoUrl: "https://www.youtube.com/watch?v=jlz9upE5_hE" },
      { id: "d5e4", name: "Махи сидя в наклоне", sets: "3×12", rest: "", weight: "по 5 кг", superset: "A3", comment: "3 и 4 упражнение делаешь сразу, без перерыва!", videoUrl: "https://www.youtube.com/watch?v=EvGRGNpYT9I" },
      { id: "d5e5", name: "Тяга штанги к животу в наклоне", sets: "3×10", rest: "40с", weight: "40 кг", superset: "B1", comment: "", videoUrl: "https://www.youtube.com/watch?v=ajiggjOjQG8" },
      { id: "d5e6", name: "Жим штанги «гильотина»", sets: "3×8", rest: "", weight: "30 кг", superset: "B2", comment: "Медленное опускание. Гриф опускается на шею", videoUrl: "https://www.youtube.com/watch?v=FK3SbhxnBMs" },
      { id: "d5e7", name: "Разгибание рук на верхнем блоке (статодинамика)", sets: "3×20-2", rest: "", weight: "10-15 кг", superset: "C1", comment: "20 медленных повторений, 30с отдых, ещё 20 = 1 подход", videoUrl: "https://www.youtube.com/watch?v=nHq_8skH6BM" },
      { id: "d5e8", name: "ПШНБ стоя", sets: "3×10", rest: "", weight: "20-25 кг", superset: "C2", comment: "Медленно концентрировано", videoUrl: "https://www.youtube.com/watch?v=APGw5Xi8xfQ" },
      { id: "d5e9", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
    ],
    notes: "Статодинамика: руки ходят внутри амплитуды, не выпрямляй полностью.",
  },
  {
    day: 6,
    exercises: [
      { id: "d6e1", name: "Тяга штанги к животу в наклоне", sets: "3×12", rest: "40с", weight: "40 кг", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=ajiggjOjQG8" },
      { id: "d6e2", name: "Разводка с гантелями", sets: "3×12", rest: "", weight: "8-10 кг", superset: "A1", comment: "", videoUrl: "https://www.youtube.com/watch?v=QaJcczm4uZU" },
      { id: "d6e3", name: "Подтягивания на низкой перекладине", sets: "3×макс", rest: "", weight: "", superset: "A2", comment: "", videoUrl: "https://www.youtube.com/watch?v=MXBQWYnWgw4" },
      { id: "d6e4", name: "Обратные выпады с гантелями", sets: "3×10", rest: "", weight: "по 8-10 кг", superset: "B1", comment: "Каждой ногой", videoUrl: "https://www.youtube.com/watch?v=KO2CB-XdXHg" },
      { id: "d6e5", name: "Тяга штанги к подбородку широким хватом", sets: "3×10", rest: "", weight: "20-25 кг", superset: "B2", comment: "Гриф до груди, локоть не выше плеча", videoUrl: "https://www.youtube.com/watch?v=Y9x7blBNwJo" },
      { id: "d6e6", name: "Тяга нижнего блока широким хватом", sets: "3×8", rest: "", weight: "30-35 кг", superset: "C1", comment: "", videoUrl: "https://www.youtube.com/watch?v=ak1RSX5XawQ" },
      { id: "d6e7", name: "Шраги с гантелями", sets: "3×12", rest: "", weight: "по 15-20 кг", superset: "C2", comment: "Плечи строго вверх-вниз, иначе можно навредить", videoUrl: "https://www.youtube.com/watch?v=acTBIY73ibM" },
      { id: "d6e8", name: "Разгибание рук с НИЖНЕГО блока", sets: "3×10", rest: "", weight: "15-20 кг", superset: "D1", comment: "", videoUrl: "https://www.youtube.com/watch?v=uBT-BYAfy1U" },
      { id: "d6e9", name: "ПШНБ на скамье Скотта", sets: "3×12", rest: "", weight: "20-25 кг", superset: "D2", comment: "", videoUrl: "https://www.youtube.com/watch?v=02WfQAoSVEc" },
      { id: "d6e10", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "E1", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
      { id: "d6e11", name: "Гиперэкстензия с блином", sets: "3×10-12", rest: "", weight: "10-15 кг", superset: "E2", comment: "", videoUrl: "https://www.youtube.com/watch?v=1en5keKWZt4" },
    ],
    notes: "",
  },
  {
    day: 7,
    exercises: [
      { id: "d7e1", name: "Приседания со штангой на плечах", sets: "3×10", rest: "", weight: "45 кг", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=GotRb2Ob7MA" },
      { id: "d7e2", name: "Жим гантелей на горизонтальной скамье", sets: "3×10", rest: "", weight: "по 12-15 кг", superset: "A1", comment: "", videoUrl: "https://www.youtube.com/watch?v=mXdyLcQ_VZU" },
      { id: "d7e3", name: "Тяга штанги к животу в наклоне", sets: "3×8", rest: "", weight: "40-45 кг", superset: "A2", comment: "", videoUrl: "https://www.youtube.com/watch?v=ajiggjOjQG8" },
      { id: "d7e4", name: "Жим ногами", sets: "3×12", rest: "", weight: "70-80 кг", superset: "B1", comment: "Поясницу плотно прижать, не отрывать", videoUrl: "https://www.youtube.com/watch?v=jyphzYKrptw" },
      { id: "d7e5", name: "Подъем на носки", sets: "3×30", rest: "", weight: "СПВ", superset: "B2", comment: "В руки блинчик взять", videoUrl: "https://www.youtube.com/watch?v=LUVK1Faa0qY" },
      { id: "d7e6", name: "Подъем блина перед собой", sets: "3×8", rest: "", weight: "10 кг", superset: "B3", comment: "Медленно опускаешь, быстро поднимаешь", videoUrl: "https://www.youtube.com/watch?v=RzrMA2Gqgsc" },
      { id: "d7e7", name: "ПШНБ стоя", sets: "3×10", rest: "", weight: "25-30 кг", superset: "C1", comment: "", videoUrl: "https://www.youtube.com/watch?v=FqF11YdwxrQ" },
      { id: "d7e8", name: "Разгибание рук на верхнем блоке стоя", sets: "3×10", rest: "", weight: "25-30 кг", superset: "C2", comment: "Медленно", videoUrl: "https://www.youtube.com/watch?v=nHq_8skH6BM" },
      { id: "d7e9", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
    ],
    notes: "",
  },
  {
    day: 8,
    exercises: [
      { id: "d8e1", name: "Жим штанги лежа на горизонтальной скамье", sets: "4×8", rest: "45с", weight: "45 кг", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=KIVM12jIn1Q" },
      { id: "d8e2", name: "Сгибание ног на тренажере лежа", sets: "3×12", rest: "", weight: "30-35 кг", superset: "A1", comment: "Медленно", videoUrl: "https://www.youtube.com/watch?v=kHA7OtTBjAA" },
      { id: "d8e3", name: "Жим гантелей сидя", sets: "3×10", rest: "", weight: "по 10-12 кг", superset: "A2", comment: "", videoUrl: "https://www.youtube.com/watch?v=MT0Z1J6TPKE" },
      { id: "d8e4", name: "Тяга верхнего блока широким хватом", sets: "3×8", rest: "", weight: "40-45 кг", superset: "B1", comment: "", videoUrl: "https://www.youtube.com/watch?v=3Q2midW9yYw" },
      { id: "d8e5", name: "Жим гантелей на наклонной скамье", sets: "3×10", rest: "", weight: "по 12-15 кг", superset: "B2", comment: "Медленно опускать, быстро поднимать", videoUrl: "https://www.youtube.com/watch?v=xwtaHancCQc" },
      { id: "d8e6", name: "Отжимания от лавки сзади", sets: "3×макс", rest: "", weight: "", superset: "C1", comment: "", videoUrl: "https://www.youtube.com/watch?v=-wIgC3QHDTw" },
      { id: "d8e7", name: "Подъем гантелей на бицепс стоя", sets: "3×8", rest: "", weight: "по 10-12 кг", superset: "C2", comment: "Одновременный", videoUrl: "https://www.youtube.com/watch?v=ki-WpA8hKOY" },
      { id: "d8e8", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
    ],
    notes: "Упражнения 4 и 5 — если есть силы, можно сделать 4 подхода.",
  },
  {
    day: 9,
    exercises: [
      { id: "d9e1", name: "Тяга штанги к животу в наклоне", sets: "3×10", rest: "45с", weight: "45 кг", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=ajiggjOjQG8" },
      { id: "d9e2", name: "Разводка с гантелями", sets: "3×8", rest: "", weight: "10-12 кг", superset: "A1", comment: "", videoUrl: "https://www.youtube.com/watch?v=QaJcczm4uZU" },
      { id: "d9e3", name: "Тяга нижнего блока узким хватом", sets: "3×8", rest: "", weight: "40-45 кг", superset: "A2", comment: "", videoUrl: "https://www.youtube.com/watch?v=ak1RSX5XawQ" },
      { id: "d9e4", name: "Выпады с гантелями вперед", sets: "3×10", rest: "", weight: "по 10-12 кг", superset: "B1", comment: "", videoUrl: "https://www.youtube.com/watch?v=LrYHio3VMRg" },
      { id: "d9e5", name: "Жим штанги стоя с груди", sets: "3×8", rest: "", weight: "25-30 кг", superset: "B2", comment: "", videoUrl: "https://www.youtube.com/watch?v=e8h_a9IvlXs" },
      { id: "d9e6", name: "Подтягивания на низкой перекладине", sets: "3×10", rest: "", weight: "", superset: "C1", comment: "", videoUrl: "https://www.youtube.com/watch?v=MXBQWYnWgw4" },
      { id: "d9e7", name: "Шраги с гантелями", sets: "3×12", rest: "", weight: "по 20-25 кг", superset: "C2", comment: "", videoUrl: "https://www.youtube.com/watch?v=acTBIY73ibM" },
      { id: "d9e8", name: "Жим лежа узким хватом", sets: "3×10", rest: "", weight: "30-35 кг", superset: "D1", comment: "", videoUrl: "https://www.youtube.com/watch?v=x4A0qCPmXUA" },
      { id: "d9e9", name: "ПШНБ на скамье Скотта", sets: "3×8", rest: "", weight: "25-30 кг", superset: "D2", comment: "Медленно опускаешь", videoUrl: "https://www.youtube.com/watch?v=02WfQAoSVEc" },
      { id: "d9e10", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "E1", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
      { id: "d9e11", name: "Гиперэкстензия с блином", sets: "3×10", rest: "", weight: "15 кг", superset: "E2", comment: "", videoUrl: "https://www.youtube.com/watch?v=1en5keKWZt4" },
    ],
    notes: "",
  },
  {
    day: 10,
    exercises: [
      { id: "d10e1", name: "Приседания со штангой на плечах", sets: "4×12", rest: "", weight: "45 кг", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=GotRb2Ob7MA" },
      { id: "d10e2", name: "Жим гантелей на горизонтальной скамье", sets: "3×8", rest: "", weight: "по 12-15 кг", superset: "A1", comment: "", videoUrl: "https://www.youtube.com/watch?v=mXdyLcQ_VZU" },
      { id: "d10e3", name: "Тяга гантели в наклоне с упором", sets: "3×8", rest: "", weight: "20-25 кг", superset: "A2", comment: "", videoUrl: "https://www.youtube.com/watch?v=Ch4UZW_j08Q" },
      { id: "d10e4", name: "Жим ногами", sets: "3×10", rest: "", weight: "80-90 кг", superset: "B1", comment: "Поясницу плотно прижать, не отрывать", videoUrl: "https://www.youtube.com/watch?v=jyphzYKrptw" },
      { id: "d10e5", name: "Подъем на носки", sets: "3×30", rest: "", weight: "СПВ", superset: "B2", comment: "", videoUrl: "https://www.youtube.com/watch?v=LUVK1Faa0qY" },
      { id: "d10e6", name: "Тяга штанги к подбородку широким хватом", sets: "3×8", rest: "", weight: "25-30 кг", superset: "B3", comment: "Гриф до груди, локоть не выше плеча", videoUrl: "https://www.youtube.com/watch?v=Y9x7blBNwJo" },
      { id: "d10e7", name: "Подъем гантелей на бицепс сидя", sets: "3×10", rest: "", weight: "по 10-12 кг", superset: "C1", comment: "", videoUrl: "https://www.youtube.com/watch?v=P957YHBOs6Q" },
      { id: "d10e8", name: "Разгибание рук с гантелью сидя из-за головы", sets: "3×10", rest: "", weight: "20-25 кг", superset: "C2", comment: "Медленно", videoUrl: "https://www.youtube.com/watch?v=7QVHcc_aP5Y" },
      { id: "d10e9", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
    ],
    notes: "",
  },
  {
    day: 11,
    exercises: [
      { id: "d11e1", name: "Жим штанги лежа на горизонтальной скамье", sets: "4×10", rest: "45с", weight: "45 кг", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=40lDxdSfhW0" },
      { id: "d11e2", name: "Разгибание ног в тренажере", sets: "3×10", rest: "", weight: "30-35 кг", superset: "A1", comment: "Медленно. Сам подбирай вес", videoUrl: "https://www.youtube.com/watch?v=qz8QvMGHJu0" },
      { id: "d11e3", name: "Махи гантелей в стороны стоя", sets: "3×10", rest: "", weight: "по 7-10 кг", superset: "A2", comment: "3 и 4 без перерыва!", videoUrl: "https://www.youtube.com/watch?v=jlz9upE5_hE" },
      { id: "d11e4", name: "Махи сидя в наклоне", sets: "3×10", rest: "", weight: "по 5-7 кг", superset: "A3", comment: "3 и 4 без перерыва!", videoUrl: "https://www.youtube.com/watch?v=EvGRGNpYT9I" },
      { id: "d11e5", name: "Тяга штанги к животу в наклоне", sets: "3×8", rest: "", weight: "45-50 кг", superset: "B1", comment: "", videoUrl: "https://www.youtube.com/watch?v=ajiggjOjQG8" },
      { id: "d11e6", name: "Жим штанги «гильотина»", sets: "3×10", rest: "", weight: "30-35 кг", superset: "B2", comment: "Медленное опускание", videoUrl: "https://www.youtube.com/watch?v=FK3SbhxnBMs" },
      { id: "d11e7", name: "Разгибание рук на верхнем блоке (статодинамика)", sets: "3×20-2", rest: "", weight: "15-20 кг", superset: "C1", comment: "20 медленных, 30с отдых, ещё 20 = 1 подход", videoUrl: "https://www.youtube.com/watch?v=nHq_8skH6BM" },
      { id: "d11e8", name: "ПШНБ стоя", sets: "3×10", rest: "", weight: "25-30 кг", superset: "C2", comment: "Медленно концентрировано", videoUrl: "https://www.youtube.com/watch?v=APGw5Xi8xfQ" },
      { id: "d11e9", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
    ],
    notes: "Статодинамика: руки ходят внутри амплитуды, не выпрямляй полностью.",
  },
  {
    day: 12,
    exercises: [
      { id: "d12e1", name: "Тяга штанги к животу в наклоне", sets: "3×8", rest: "", weight: "50 кг", superset: "", comment: "", videoUrl: "https://www.youtube.com/watch?v=ajiggjOjQG8" },
      { id: "d12e2", name: "Разводка с гантелями", sets: "3×10", rest: "", weight: "10-12 кг", superset: "A1", comment: "", videoUrl: "https://www.youtube.com/watch?v=QaJcczm4uZU" },
      { id: "d12e3", name: "Подтягивания на низкой перекладине", sets: "3×12", rest: "", weight: "", superset: "A2", comment: "", videoUrl: "https://www.youtube.com/watch?v=MXBQWYnWgw4" },
      { id: "d12e4", name: "Обратные выпады с гантелями", sets: "3×10", rest: "", weight: "по 10-12 кг", superset: "B1", comment: "Каждой ногой", videoUrl: "https://www.youtube.com/watch?v=KO2CB-XdXHg" },
      { id: "d12e5", name: "Тяга штанги к подбородку широким хватом", sets: "3×10", rest: "", weight: "25-30 кг", superset: "B2", comment: "Гриф до груди, локоть не выше плеча", videoUrl: "https://www.youtube.com/watch?v=Y9x7blBNwJo" },
      { id: "d12e6", name: "Тяга нижнего блока широким хватом", sets: "3×10", rest: "", weight: "35-40 кг", superset: "C1", comment: "", videoUrl: "https://www.youtube.com/watch?v=q-0E4X2D_gU" },
      { id: "d12e7", name: "Шраги с гантелями", sets: "3×12", rest: "", weight: "по 20-25 кг", superset: "C2", comment: "Плечи строго вверх-вниз", videoUrl: "https://www.youtube.com/watch?v=acTBIY73ibM" },
      { id: "d12e8", name: "Разгибание рук с НИЖНЕГО блока", sets: "3×10", rest: "", weight: "15-20 кг", superset: "D1", comment: "", videoUrl: "https://www.youtube.com/watch?v=uBT-BYAfy1U" },
      { id: "d12e9", name: "ПШНБ на скамье Скотта", sets: "3×8", rest: "", weight: "25-30 кг", superset: "D2", comment: "", videoUrl: "https://www.youtube.com/watch?v=02WfQAoSVEc" },
      { id: "d12e10", name: "Прямые скручивания на пресс", sets: "3×30", rest: "", weight: "", superset: "E1", comment: "", videoUrl: "https://www.youtube.com/watch?v=tVOT5OtwTLc" },
      { id: "d12e11", name: "Гиперэкстензия с блином", sets: "3×10", rest: "", weight: "15-20 кг", superset: "E2", comment: "", videoUrl: "https://www.youtube.com/watch?v=1en5keKWZt4" },
    ],
    notes: "",
  },
];

export const achievements = [
  { id: "first_workout", name: "Первый шаг", description: "Завершить первую тренировку", icon: "🏋️", xp: 50, condition: (completed: number) => completed >= 1 },
  { id: "streak_3", name: "На волне", description: "3 тренировки подряд", icon: "🔥", xp: 100, condition: (completed: number, streak: number) => streak >= 3 },
  { id: "streak_7", name: "Неделя огня", description: "7 тренировок подряд", icon: "💪", xp: 250, condition: (completed: number, streak: number) => streak >= 7 },
  { id: "streak_14", name: "Железная воля", description: "14 тренировок подряд", icon: "⚡", xp: 500, condition: (completed: number, streak: number) => streak >= 14 },
  { id: "half_program", name: "Половина пути", description: "Завершить 6 тренировок", icon: "🎯", xp: 200, condition: (completed: number) => completed >= 6 },
  { id: "full_program", name: "Программа пройдена", description: "Завершить все 12 тренировок", icon: "🏆", xp: 1000, condition: (completed: number) => completed >= 12 },
  { id: "weight_up_5", name: "Прогресс!", description: "Увеличить вес в 5 упражнениях", icon: "📈", xp: 150, condition: (_c: number, _s: number, weightUps: number) => weightUps >= 5 },
  { id: "weight_up_20", name: "Машина", description: "Увеличить вес в 20 упражнениях", icon: "🦾", xp: 400, condition: (_c: number, _s: number, weightUps: number) => weightUps >= 20 },
  { id: "two_cycles", name: "Второй круг", description: "Завершить 24 тренировки (2 цикла)", icon: "🔄", xp: 1500, condition: (completed: number) => completed >= 24 },
  { id: "three_cycles", name: "Легенда зала", description: "Завершить 36 тренировок (3 цикла)", icon: "👑", xp: 3000, condition: (completed: number) => completed >= 36 },
];

export const levels = [
  { level: 1, title: "Новичок", minXp: 0 },
  { level: 2, title: "Начинающий", minXp: 100 },
  { level: 3, title: "Любитель", minXp: 300 },
  { level: 4, title: "Регулярный", minXp: 600 },
  { level: 5, title: "Продвинутый", minXp: 1000 },
  { level: 6, title: "Опытный", minXp: 1500 },
  { level: 7, title: "Сильный", minXp: 2200 },
  { level: 8, title: "Мощный", minXp: 3000 },
  { level: 9, title: "Элитный", minXp: 4000 },
  { level: 10, title: "Легенда", minXp: 5500 },
];
