type ExerciseValues = {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
};

export const calculateExercises = (daily_exercises: number[], target: number): ExerciseValues => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter(hours => hours > 0).length;
  const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target * 0.8 ? 2 : 1;
  const ratingDescription = [
    "Bad",
    "Not too bad but could be better",
    "Good",
  ];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescription[rating - 1],
    target,
    average
  };
};
