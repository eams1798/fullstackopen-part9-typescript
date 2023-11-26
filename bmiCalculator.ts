const parseArguments = (args: Array<string>): { height: number, weight: number } => {
  if (args[0] && args[1] && !isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1])
    };
  } else {
    throw new Error('malformatted parameters');
  }
};

type bmiResponse = {
  height: number,
  weight: number,
  bmi: string
};

const calculateBmi = (height: number, weight: number): bmiResponse => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let bmiInfo = '';
  if (bmi < 18.5) {
      bmiInfo = 'Underweight';
  } else if (bmi < 25) {
      bmiInfo = 'Normal (healthy weight)';
  } else if (bmi < 30) {
      bmiInfo = 'Overweight';
  } else {
      bmiInfo = 'Obese';
  }

  return {
    height,
    weight,
    bmi: `${bmiInfo}: ${bmi.toFixed(2)}`
  };
};

export const bmiCalculator = (strHeight: string, strWeight: string): bmiResponse => {
  try {
    const { height, weight } = parseArguments([strHeight, strWeight]);
    return calculateBmi(height, weight);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something bad happened.');
    }
  }
};
