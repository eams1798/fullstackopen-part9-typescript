import { isNumber } from "../utils";

const isHealthCheckRating = (param: number): param is 0 | 1 | 2 | 3 | 4 => {
  return [0, 1, 2, 3, 4].includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (healthCheckRating === null || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing health check rating");
  }
  return healthCheckRating;
};

type HealthCheckSubProperties = {
  healthCheckRating: number;
};

const parseHealthCheckEntry = (entry: unknown): HealthCheckSubProperties => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing health check entry");
  }

  if ("healthCheckRating" in entry) {
    return ({
      healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
    });
  } else {
    throw new Error("Incorrect or missing health check entry");
  }
};

export default parseHealthCheckEntry;