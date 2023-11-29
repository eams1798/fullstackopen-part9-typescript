import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"
import { courseName, courseParts } from "./data"

function App() {
  return (
    <div>
      <Header course={courseName} />
      <Content parts={courseParts}/>
      <Total parts={courseParts}/>
    </div>
  )
}

export default App
