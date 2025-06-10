import ActivityChart from "./components/ActivityChart";
import { useState } from "react";
import MarkdownRenderer from "./components/MarkdownRendrer";
import Hero from "./components/Hero";
function App() {
  const rows = 7;
  const cols = 52;

  const [grid, setGrid] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(false))
  );

  const handleCheckboxChange = (rowIndex, colIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = !newGrid[rowIndex][colIndex];
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid(
      Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(false))
    );
  };

  return (
    <main className="bg-bg text-text">
      <Hero />
      <ActivityChart
        grid={grid}
        handleCheckboxChange={handleCheckboxChange}
        clearGrid={clearGrid}
      />
      <MarkdownRenderer />
    </main>
  );
}

export default App;
