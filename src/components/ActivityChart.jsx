import { FaTrashAlt } from 'react-icons/fa';
import JSZip from 'jszip'; // For creating zip files
import { saveAs } from 'file-saver'; // For saving files

const ActivityChart = ({ grid, handleCheckboxChange, clearGrid }) => {
  const getColorIntensity = (isChecked) => {
    return isChecked ? "bg-green-600" : "bg-gray-200";
  };

  const downloadArtAndScript = async () => {
    // Create a new zip file
    const zip = new JSZip();
    
    // 1. Add art.txt to the zip
    const artText = grid.map(row => 
      row.map(cell => cell ? '#' : ' ').join('')
    ).join('\n');
    zip.file("art.txt", artText);
    
    // 2. Add script.py to the zip
    try {
      const response = await fetch('/scripts/script.py');
      const scriptContent = await response.text();
      zip.file("script.py", scriptContent);
    } catch (error) {
      console.error("Error loading script.py:", error);
      // Fallback: Add a default script if the file can't be loaded
      zip.file("script.py", `# Python script to process your art\n# Your grid data will be in art.txt`);
    }
    
    // Generate the zip file and trigger download
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, "github-art-package.zip");
  };

  return (
    <div className="flex flex-col items-center p-4 w-[80%] mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-4 w-[100%]">
        Draw Your Art here:
      </h2>

      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="h-4 w-8 text-xs text-right pr-1">
              {day}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          {grid.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex gap-1">
              {row.map((isChecked, colIndex) => (
                <input
                  key={`cell-${rowIndex}-${colIndex}`}
                  type="checkbox"
                  className={`h-4 w-4 rounded-sm border border-gray-300 appearance-none cursor-pointer hover:opacity-80 transition-opacity ${getColorIntensity(
                    isChecked
                  )}`}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={clearGrid}
          className="px-4 py-2 text-text rounded-2xl hover:bg-text hover:text-white dark:hover:text-black transition-colors duration-200 ease-in flex items-center gap-2 cursor-pointer"
        >
          <FaTrashAlt className="inline" />
          Clear
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