import ActivityChart from "./components/ActivityChart"
import { useState } from "react";
import MarkdownRenderer from "./components/MarkdownRendrer";
function App() {
  const rows = 7;
  const cols = 52; 

  const [grid, setGrid] = useState(
    Array(rows).fill(null).map(() => Array(cols).fill(false))
  );

  const handleCheckboxChange = (rowIndex, colIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = !newGrid[rowIndex][colIndex];
    setGrid(newGrid);
  };

  return (
    <>
      <ActivityChart grid={grid} handleCheckboxChange={handleCheckboxChange}/>
      <MarkdownRenderer/>
    </>
  )
}

export default App
