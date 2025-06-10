import { FaTrashAlt } from 'react-icons/fa';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useState } from 'react';

const ActivityChart = ({ grid, handleCheckboxChange, clearGrid }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [intensity, setIntensity] = useState(5); // Default: 5 commits

  // Intensity map (reordered for intuitive color mapping)
  const intensityLevels = [
    { name: 'Light', commits: 12, color: 'bg-green-300' },
    { name: 'Medium', commits: 8, color: 'bg-green-500' },
    { name: 'Dark', commits: 5, color: 'bg-green-700' },
    { name: 'Very Dark', commits: 2, color: 'bg-green-900' },
  ];

  const getColorForCell = (isChecked) => {
    if (!isChecked) return "bg-gray-200";
    // Find the color that matches the currently selected intensity
    return intensityLevels.find(level => level.commits === intensity)?.color || 'bg-green-500';
  };

  // Validates the year when the input field loses focus
  const handleYearBlur = () => {
    const currentYear = new Date().getFullYear();
    // If the year is not a number or is an unreasonable value, reset to the current year.
    if (!year || isNaN(year) || year < 1970) {
      setYear(currentYear);
    }
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
      const response = await fetch('/scripts/script.py');
      let scriptContent = await response.text();

      // Modify the script content before zipping
      scriptContent = scriptContent
        .replace(
          /COMMITS_PER_DOT = \d+/,
          `COMMITS_PER_DOT = ${intensity}`
        )
        .replace(
          /TARGET_YEAR = \w+/, // More robust regex for 'None' or a number
          `TARGET_YEAR = ${year}`
        );

      zip.file("script.py", scriptContent); // Use consistent naming

    } catch (error) {
      console.error("Error loading or modifying script.py:", error);
      alert("Failed to prepare the script. Please try again.");
      return;
    }

    // 3. Generate the zip file and trigger download
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, "github-art-package.zip");
  };

  return (
    <div className="flex flex-col items-center p-4 w-[90%] md:w-[80%] mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-4 w-full">
        Draw Your Art here:
      </h2>

      {/* --- UI Controls --- */}
      <div className="flex flex-col md:flex-row gap-8 w-full mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="year" className="font-medium">Year:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onBlur={handleYearBlur} // Validate when user clicks away
            className="w-24 px-2 py-1 border rounded"
            placeholder={new Date().getFullYear()}
          />
        </div>

        <div className="flex items-center">
          <span className="font-medium mr-4">Commit Intensity:</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {intensityLevels.map(({ name, commits, color }) => (
              <label key={name} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="intensity"
                  checked={intensity === commits}
                  onChange={() => setIntensity(commits)}
                  className="h-4 w-4"
                />
                <div className={`w-4 h-4 rounded-sm ${color}`}></div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* --- Drawing Grid (with horizontal scroll) --- */}
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-1 text-xs text-right pr-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="h-4 leading-4">{day}</div>
          ))}
        </div>
        <div className="flex-1 overflow-x-auto pb-2">
          <div className="flex flex-col gap-1 w-max">
            {grid.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex gap-1">
                {row.map((isChecked, colIndex) => (
                  <input
                    key={`cell-${rowIndex}-${colIndex}`}
                    type="checkbox"
                    className={`h-4 w-4 rounded-sm border border-gray-300 appearance-none cursor-pointer hover:opacity-80 ${getColorForCell(isChecked)}`}
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(rowIndex, colIndex)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
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
          Download Art Package
        </button>
      </div>
    </div>
  );
};

export default ActivityChart;