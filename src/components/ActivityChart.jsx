import { FaDownload, FaTrashAlt } from 'react-icons/fa';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useState } from 'react';

const ActivityChart = ({ grid, handleCheckboxChange, clearGrid }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  
  // New purple-themed intensity palette
  const intensityLevels = [
    { name: 'Subtle', commits: 2,  color: 'bg-green-400' },
    { name: 'Light',  commits: 5,  color: 'bg-green-500' },
    { name: 'Medium', commits: 8,  color: 'bg-green-700' },
    { name: 'Heavy',  commits: 12, color: 'bg-green-900' },
  ];

  // Default to the "Medium" intensity
  const [intensity, setIntensity] = useState(intensityLevels[2].commits);

  const getColorForCell = (isChecked) => {
    // A dark, slightly transparent background for inactive cells
    if (!isChecked) return "bg-slate-300 dark:bg-slate-800"; 
    return intensityLevels.find(level => level.commits === intensity)?.color || 'bg-green-500';
  };

  const handleYearBlur = () => {
    const currentYear = new Date().getFullYear();
    if (!year || isNaN(year) || year < 1970) {
      setYear(currentYear);
    }
  };

  const downloadArtAndScript = async () => {
    // ... (download logic remains the same)
    const zip = new JSZip();
    const artText = grid.map(row => row.map(cell => (cell ? '#' : ' ')).join('')).join('\n');
    zip.file("art.txt", artText);
    try {
      const response = await fetch('/scripts/script.py');
      let scriptContent = await response.text();
      scriptContent = scriptContent
        .replace(/COMMITS_PER_DOT = \d+/, `COMMITS_PER_DOT = ${intensity}`)
        .replace(/TARGET_YEAR = \w+/, `TARGET_YEAR = ${year}`);
      zip.file("script.py", scriptContent);
    } catch (error) {
      console.error("Error loading or modifying script.py:", error);
      alert("Failed to prepare the script. Please try again.");
      return;
    }
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, "github-art-package.zip");
  };

  return (
    // Main container with a modern, glassy dark background
    <div className="flex flex-col items-center p-6 md:p-8 w-[95%] md:w-[85%] mx-auto mt-10 dark:bg-gray-900/50 backdrop-blur-sm dark:border border-slate-700 rounded-xl">
      <h2 className="text-5xl font-bold mb-6 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
        Draw Your Masterpiece
      </h2>

      {/* --- UI Controls --- */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full mb-6 p-4 dark:bg-slate-800/50 rounded-lg">
        <div className="flex items-center gap-3">
          <label htmlFor="year" className="font-medium text-gray-900 dark:text-gray-300">Year:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onBlur={handleYearBlur}
            className="w-24 px-3 py-1.5 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder={new Date().getFullYear()}
          />
        </div>

        <div className="flex items-center">
          <span className="font-medium text-gray-900 dark:text-gray-300 mr-4">Intensity:</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {intensityLevels.map(({ name, commits, color }) => (
              <label key={name} className="flex items-center gap-2 cursor-pointer group">
                {/* Hidden radio button, we style the div instead */}
                <input
                  type="radio"
                  name="intensity"
                  checked={intensity === commits}
                  onChange={() => setIntensity(commits)}
                  className="absolute opacity-0 h-0 w-0"
                />
                <div className={`w-4 h-4 rounded-sm ${color} transition-transform group-hover:scale-110 ${intensity === commits ? 'ring-2 ring-offset-2 dark:ring-offset-slate-900 ring-pink-500' : ''}`}></div>
                <span className={`text-sm ${intensity === commits ? 'text-gray-700 dark:text-white' : 'text-gray-400'} group-hover:text-black group-hover:dark:text-white transition-colors`}>{name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* --- Drawing Grid --- */}
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-1 text-xs text-right pr-2 text-gray-400">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="h-4 leading-4 mt-px">{day}</div>
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
                    className={`h-4 w-4 rounded-sm border-none appearance-none cursor-pointer transition-colors duration-100 ${getColorForCell(isChecked)} hover:opacity-80`}
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
      <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
        <button
          onClick={clearGrid}
          className="px-5 py-2.5 border border-red-500 text-red-500 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-red-500 hover:text-white transform hover:scale-105"
        >
          <FaTrashAlt /> Clear Grid
        </button>
        <button
          onClick={downloadArtAndScript}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
        >
          <FaDownload /> Download Package
        </button>
      </div>
    </div>
  );
};

export default ActivityChart;