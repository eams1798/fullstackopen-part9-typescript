import { CoursePart } from "../types";

interface ITotalProps {
  parts: CoursePart[]
}

const Total = ({parts}: ITotalProps) => {
  const total: number = parts.reduce((sum, {exerciseCount}) => sum + exerciseCount, 0);

  return <p>Number of exercises {total}</p>
}

export default Total;