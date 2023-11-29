import { CoursePart } from "../types";

interface IPartProps {
  part: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const Part = ({part}: IPartProps) => {
  let contentPart: JSX.Element[];

  switch (part.kind) {
    case "basic":
      contentPart = [
        <i key="description">Description: {part.description}</i>
      ];
      break;
    case "group":
      contentPart = [
        <p key="groupProjectCount">Group project exercises: {part.groupProjectCount}</p>,
      ];
      break;
    case "background":
      contentPart = [
        <i key="description">Description: {part.description}</i>,
        <p key="backgroundMaterial">{part.backgroundMaterial}</p>,
      ];
      break;
    case "special":
      contentPart = [
        <i key="description">Description: {part.description}</i>,
        <p key="requirements">Required skills:</p>,
        <ul>
          {part.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      ]
      break;
    default:
      contentPart = [
        <p key="error">{assertNever(part)}</p>
      ];

      break;
  }
  return (
  <div>
    <h3>{part.name}</h3>
    <p>Exercises: {part.exerciseCount}</p>
    {contentPart.map((partElement) => (
      <div key={partElement.key}>{partElement}</div>
    ))}
  </div>)
}

export default Part;