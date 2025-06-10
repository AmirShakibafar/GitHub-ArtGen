import { FaTrashAlt } from 'react-icons/fa';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useState } from 'react';

const ActivityChart = ({ grid, handleCheckboxChange, clearGrid }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  // The intensity state now directly controls the commit count
  const [intensity, setIntensity] = useState(5); // Default: 5 commits

  // Map intensity names to commit counts for the UI
  const intensityLevels = [
    { name: 'Light', commits: 12, color: 'bg-green-300' },
    { name: 'Medium', commits: 8, color: 'bg-green-500' },
    { name: 'Dark', commits: 5, color: 'bg-green-700' },
    { name: 'Very Dark', commits: 2, color: 'bg-green-900' },
  ];

  const getColorForCell = (isChecked) => {
    if (!isChecked) return "bg-gray-200";
    // Find the color that matches the current intensity setting
    return intensityLevels.find(level => level.commits === intensity)?.color || 'bg-green-500';
  };

  const downloadArtAndScript = async () => {
    const zip = new JSZip();

    // 1. Generate art.txt from the grid state
    const artText = grid.map(row =>
      row.map(cell => (cell ? '#' : ' ')).join('')
    ).join('\n');
    zip.file("art.txt", artText);

    // 2. Fetch, modify, and add the Python script
    try {
      const response = await fetch('/scripts/script.py'); // Assumes script is in /public/scripts/
      let scriptContent = await response.text();

 
      scriptContent = scriptContent
        .replace(
          /COMMITS_PER_DOT = \d+/, 
          `COMMITS_PER_DOT = ${intensity}` 
        )
        .replace(
          /TARGET_YEAR = None/, 
          `TARGET_YEAR = ${year}`
        );

      zip.file("github_art_generator.py", scriptContent);

    } catch (error) {
      console.error("Error loading or modifying script.py:", error);
      alert("Failed to prepare the script. Please try again.");
      return; // Stop the download process if the script fails
    }

    // 3. Generate the zip file and trigger download
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, "github-art-package.zip");
  };

  return (
    <div className="flex flex-col items-center p-4 w-[80%] mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-4 w-[100%]">
        Draw Your Art here:
      </h2>

      {/* UI Controls */}
      <div className="flex flex-col md:flex-row gap-8 w-full mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="year" className="font-medium">Year:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
            className="w-24 px-2 py-1 border rounded"
          />
        </div>

        <div className="flex items-center">
          <span className="font-medium mr-4">Commit Intensity:</span>
          <div className="flex flex-wrap gap-4">
            {intensityLevels.map(({ name, commits, color }) => (
              <label key={name} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="intensity"
                  checked={intensity === commits}
                  onChange={() => setIntensity(commits)}
                  className="h-4 w-4"
                />
                <div className="flex items-center gap-1">
                  <div className={`w-4 h-4 rounded-sm ${color}`}></div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Drawing Area */}
      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="h-4 w-8 text-xs text-right pr-1">{day}</div>
          ))}
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(52, minmax(0, 1fr))', gap: '4px' }}>
          {grid.map((row, rowIndex) => (
            row.map((isChecked, colIndex) => (
              <input
                key={`cell-${rowIndex}-${colIndex}`}
                type="checkbox"
                style={{ gridRow: rowIndex + 1, gridColumn: colIndex + 1 }}
                className={`h-4 w-4 rounded-sm border border-gray-300 appearance-none cursor-pointer hover:opacity-80 ${getColorForCell(isChecked)}`}
                checked={isChecked}
                onChange={() => handleCheckboxChange(rowIndex, colIndex)}
              />
            ))
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={clearGrid}
          className="px-4 py-2 text-text rounded-2xl hover:bg-text hover:text-white dark:hover:text-black transition-colors duration-200 ease-in flex items-center gap-2 cursor-pointer"
        >
          <FaTrashAlt className="inline" /> Clear
        </button>
        <button
          onClick={downloadArtAndScript}
          className="px-4 py-2 bg-purple-700 text-white rounded-2xl hover:bg-purple-900 transition-colors duration-200 ease-in cursor-pointer"
        >
          Download Art Package (.zip)
        </button>
      </div>
    </div>
  );
};

export default ActivityChart;