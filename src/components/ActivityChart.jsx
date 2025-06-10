import { FaTrashAlt } from 'react-icons/fa';

const ActivityChart = ({ grid, handleCheckboxChange, clearGrid }) => {
  const getColorIntensity = (isChecked) => {
    return isChecked ? "bg-green-600" : "bg-gray-200";
  };

  const downloadArt = () => {
    // Convert grid to text (#'s for true, spaces for false)
    const artText = grid.map(row => 
      row.map(cell => cell ? '#' : ' ').join('')
    ).join('\n');
    
    // Create download link
    const blob = new Blob([artText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pixel-art.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
          onClick={downloadArt}
          className="px-4 py-2 bg-purple-700 text-white rounded-2xl hover:bg-purple-900 transition-colors duration-200 ease-in cursor-pointer"
        >
          Download Art (.txt)
        </button>
      </div>
    </div>
  );
};

export default ActivityChart;
