import { CoursePart } from "../types";
import Part from "./Part";

interface IContentProps {
  parts: CoursePart[]
}

const Content = ({parts}: IContentProps) => {
  return (
  <>
    {parts.map((part, index) => (
    <Part key={index} part={part}/>
    ))}
  </>
    
  )
}

export default Content;