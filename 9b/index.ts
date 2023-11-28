import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height?.toString() || '';
  const weight = req.query.weight?.toString() || '';

  try {
    const response = bmiCalculator(height, weight);
    res.send(response);
  } catch (error : unknown) {
    res.send({ error: (error as Error).message });
  }
});

type exerciseRequestBody = {
  daily_exercises: number[],
  target: number
};

app.post("/exercises", (req, _res) => {
    const { daily_exercises, target } = req.body as exerciseRequestBody;
  
    if (!daily_exercises || !target) {
      _res.status(400).json({ error: "missing parameters" });
    }
  
    if (typeof target !== "number" || daily_exercises.some(value => typeof value !== "number")) {
      _res.status(400).json({ error: "malformatted parameters" });
    }
      
    const response = calculateExercises(daily_exercises, target);
    _res.json(response);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  